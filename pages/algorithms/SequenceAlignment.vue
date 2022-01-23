<template>
  <div>

    <br><br>

    <center>
      <div id="controls">
        <h2>Sequence Alignment</h2>
        <br>

        <div v-for="(input, key) in inputs">
          <p>Input {{ key + 1 }}: <input type="text" v-model="inputs[key]"></p>
          <p>(length: {{ input.length }})</p>
        </div>
        <br>
        <p>&alpha; (mismatch penalty): <input type="number" min="0" v-model="alpha"></p>
        <p>&delta; (gap penalty): <input type="number" min="0" v-model="delta"></p>
      </div>

      <br>

      <div v-if="renderer">
        <PlaybackControls :max="renderer.max" @playbackProgress="renderStep" />
      </div>
    </center>

    <br>
    <br>

    <center>
      <div v-if="renderer">
        <p class="monospace">{{ renderer.wordA }}</p>
        <p class="monospace">{{ renderer.word }}</p>
      </div>
      <br>
      <div ref="diagram" id="diagram" />
    </center>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CanvasRenderer, {Towards} from "~/lib/CanvasRenderer";
import PlaybackControls from "~/components/PlaybackControls.vue";

export class SequenceAlignmentRenderer extends CanvasRenderer {

  public readonly wordA: string;
  public readonly wordB: string;

  private readonly mismatchPenalty: number;
  private readonly gapPenalty: number;

  public max?: number;

  public word: string;

  public get wordAParts() {
    return this.wordA.split('');
  }

  public get wordBParts() {
    return this.wordB.split('');
  }

  constructor(canvas: HTMLCanvasElement, options: {
    wordA: string,
    wordB: string,
    mismatchPenalty: number,
    gapPenalty: number,
  }) {
    super(canvas);
    if (options.wordA.length < options.wordB.length) {
      this.wordA = options.wordB;
      this.wordB = options.wordA;
    } else {
      this.wordA = options.wordA;
      this.wordB = options.wordB;
    }

    this.mismatchPenalty = Math.max(parseInt(options.mismatchPenalty.toString()), 0);
    this.gapPenalty = Math.max(parseInt(options.gapPenalty.toString()), 0);
    this.word = "";
  }

  public render(step: number) {
    if (!this.max && step != -1) this.render(-1);
    this.ctx.fillRect(0, 0, this.width, this.height);

    let max = 0;

    // Lay out the initial graph.
    this.buildInitialGraph();

    // Now we start performing the algorithm.
    function getPosition(x: number, y: number) : { x: number, y: number } {
      let verticalStartOffset = 60;
      let horizontalStartOffset = 60;
      let padding = 40;

      return {
        x: horizontalStartOffset
          + (40 * x)
          + (padding * (x - 1)),
        y: verticalStartOffset
          + (40 * y)
          + (padding * (y - 1))
      }
    }

    let previousValues: any = [];
    for (let i = 0; i <= this.wordA.length; i++) {
      previousValues.push([]);
      for (let j = 0; j <= this.wordB.length; j++) {
        previousValues[i].push(0);
      }
    }

    for (let i = 0; i <= this.wordA.length; i++) {
      previousValues[i][0] = i * this.gapPenalty;
      if (i > 0) {
        this._ctx.save();
        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = 'black';
        let p1 = getPosition(i-1, 0);
        let p2 = getPosition(i, 0);
        this.joinNodes(p1.x, p1.y, p2.x, p2.y, Towards.RIGHT);
        this._ctx.restore();
      }
    }
    for (let i = 0; i <= this.wordB.length; i++) {
      previousValues[0][i] = i * this.gapPenalty;
      if (i > 0) {
        this._ctx.save();
        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = 'black';
        let p1 = getPosition(0,i-1);
        let p2 = getPosition(0, i);
        this.joinNodes(p1.x, p1.y, p2.x, p2.y, Towards.BOTTOM);
        this._ctx.restore();
      }
    }

    if (step == 0) return;

    let prevX = 0;
    let prevY = 0;

    let currentX = 1;
    let currentY = 1;

    ////

    for (let i = 0; i < this.wordAParts.length * this.wordBParts.length; i++) {
      if (step > 0 && i + 1 > step) return;
      max++;

      let prevPos = getPosition(prevX, prevY);
      let pos = getPosition(currentX, currentY);

      this._ctx.save();
      this._ctx.lineWidth = 2;
      this._ctx.strokeStyle = '#ADADAD';
      this.joinNodes(pos.x, prevPos.y, pos.x, pos.y, Towards.BOTTOM);
      this.joinNodes(prevPos.x, pos.y, pos.x, pos.y, Towards.RIGHT);
      this.joinNodes(prevPos.x, prevPos.y, pos.x, pos.y, Towards.BOTTOM_RIGHT);
      this._ctx.restore();

      let nodeValue;
      if (this.wordAParts[currentX-1] == this.wordBParts[currentY-1]) {
        nodeValue = previousValues[prevX][prevY];
        previousValues[currentX][currentY] = previousValues[prevX][prevY];

        this._ctx.save();
        this._ctx.lineWidth = 2;
        this._ctx.strokeStyle = 'black';
        this.joinNodes(prevPos.x, prevPos.y, pos.x, pos.y, Towards.BOTTOM_RIGHT);
        this._ctx.restore();
      } else {
        if ((previousValues[prevX][prevY] + this.mismatchPenalty) == (previousValues[currentX - 1][currentY] + this.gapPenalty)) {
          // equal

          nodeValue = previousValues[prevX][prevY] + this.mismatchPenalty;
          previousValues[currentX][currentY] = previousValues[prevX][prevY] + this.mismatchPenalty;
          this._ctx.save();
          this._ctx.lineWidth = 2;
          this._ctx.strokeStyle = 'black';

          this.joinNodes(prevPos.x, pos.y, pos.x, pos.y, Towards.RIGHT);
          this.joinNodes(prevPos.x, prevPos.y, pos.x, pos.y, Towards.BOTTOM_RIGHT);

          this._ctx.restore();
        } else if (previousValues[prevX][prevY] + this.mismatchPenalty < previousValues[currentX - 1][currentY] + this.gapPenalty) {
          // mismatch smaller
          nodeValue = previousValues[prevX][prevY] + this.mismatchPenalty;
          previousValues[currentX][currentY] = previousValues[prevX][prevY] + this.mismatchPenalty

          this._ctx.save();
          this._ctx.lineWidth = 2;
          this._ctx.strokeStyle = 'black';
          this.joinNodes(prevPos.x, prevPos.y, pos.x, pos.y, Towards.BOTTOM_RIGHT);
          this._ctx.restore();
        } else {
          // gap smaller
          nodeValue = previousValues[currentX - 1][currentY] + this.gapPenalty;
          previousValues[currentX][currentY] = previousValues[currentX - 1][currentY] + this.gapPenalty
          this._ctx.save();
          this._ctx.lineWidth = 2;
          this._ctx.strokeStyle = 'black';
          this.joinNodes(prevPos.x, pos.y, pos.x, pos.y, Towards.RIGHT);
          this._ctx.restore();
        }
      }

      this.drawNode(
        nodeValue.toString(),
        pos.x,
        pos.y
      );

      if ((currentX % (this.wordAParts.length)) == 0) {
       prevX = 0;
       prevY++;
       currentX = 1;
       currentY++;
      } else {
        prevX++;
        currentX++;
      }
    }

    currentX = this.wordAParts.length;
    currentY = this.wordBParts.length;

    let word = "";

    let drawLine = (x1: number, y1: number, x2: number, y2: number, color: string, t: Towards) => {
      let pos1 = getPosition(x1, y1);
      let pos2 = getPosition(x2, y2);
      this._ctx.save();
      this._ctx.lineWidth = 2;
      this._ctx.strokeStyle = color;
      this.joinNodes(pos1.x, pos1.y, pos2.x, pos2.y, t);
      this._ctx.restore();
    }

    while (true) {
      max++;

      if (step > 0 && (max) + 1 > step) return;

      if (currentX <= 0) {
        break;
      }

      if (currentY == 0) {
        drawLine(currentX - 1, currentY, currentX, currentY, 'red', Towards.RIGHT);
        currentX--;
        word += "_";
        continue;
      }
      if (this.wordAParts[currentX - 1] == this.wordBParts[currentY - 1]) {
        drawLine(currentX - 1, currentY - 1, currentX, currentY, 'red', Towards.BOTTOM_RIGHT);
        currentX--;
        currentY--;
        word += this.wordBParts[currentY];
      } else {
        if (previousValues[currentX - 1][currentY - 1] + this.mismatchPenalty == previousValues[currentX][currentY]) {
          drawLine(currentX - 1, currentY - 1, currentX, currentY, 'red', Towards.BOTTOM_RIGHT);
          currentX--;
          currentY--;
          word += this.wordBParts[currentY];
        } else {
          drawLine(currentX - 1, currentY, currentX, currentY, 'red', Towards.RIGHT);
          currentX--;
          word += "_";
        }
      }
    }

    if (step == -1) {
      this.word = word.split('').reverse().join('');
    }

    if (!this.max) {
      // Clear canvas.
      this.ctx.fillRect(0, 0, this.width, this.height);
      // Add number of steps to max.
      this.max = max;
    }
  }

  private buildInitialGraph() {
    const horizontal = this.wordA.split('');
    const vertical = this.wordB.split('');

    let verticalStartOffset = 60;
    let horizontalStartOffset = 60;
    let padding = 40;

    this.width = horizontalStartOffset
      + (40 * horizontal.length)
      + (padding * horizontal.length)
      + 1;

    this.height = verticalStartOffset
      + (40 * vertical.length)
      + (padding * vertical.length)
      + 1;

    // Draw the initial node.
    this.drawNode('0', 20, 20);
    this.drawText('ε', 2.5, 30);
    this.drawText('ε', 32.5, 0);

    // Now draw the word.
    horizontal.forEach((letter, index) => {
      let elementSize = // The size of each element
        (40 * index) +
        // 5px padding
        (padding * (index + 1));

      this.drawText(letter, horizontalStartOffset + elementSize + 13.5, 0);
      this.drawNode(
        (this.gapPenalty * (index + 1)).toString(),
        horizontalStartOffset + elementSize,
        20
      );
    });

    vertical.forEach((letter, index) => {
      let elementSize = // The size of each element
        (40 * index) +
        // 5px padding
        (padding * (index + 1));

      this.drawText(letter, 2.5, verticalStartOffset + elementSize + 10);
      this.drawNode(
        (this.gapPenalty * (index + 1)).toString(),
        20,
        verticalStartOffset + elementSize
      );
    });
  }

}

export default Vue.extend({
  components: {PlaybackControls},
  data: () => ({
    inputs: ['campus', 'mus'],

    // gap penalty
    delta: 2,
    // mismatch penalty
    alpha: 1,

    word: '',

    renderer: undefined as undefined | SequenceAlignmentRenderer,
  }),

  computed: {

    penalties () { return { alpha: this.alpha, delta: this.delta } }

  },

  watch: {
    inputs () { this.createRenderer(); },
    penalties () { this.createRenderer(); }
  },

  mounted() {
    this.createRenderer();
  },

  methods: {
    createRenderer () {

      if (this.inputs.length > 2) {
        (this as any).$renderText('Too many inputs: max is 2', {
          parentElement: this.$refs.diagram,
          replaceContents: true
        });
        return;
      }

      // Create canvas size.
      const canvas = document.createElement('canvas');

      this.renderer = new SequenceAlignmentRenderer(canvas, {
        wordA: this.inputs[0],
        wordB: this.inputs[1],
        gapPenalty: this.delta,
        mismatchPenalty: this.alpha,
      });

      // TODO: change this to max step.
      this.renderStep(Number.MAX_SAFE_INTEGER);

    },

    renderStep (step: number) {
      this.renderer!.render(step);

      // Render canvas on screen.
      (this as any).$renderEmpty(this.$refs.diagram);
      (this.$refs.diagram! as HTMLElement).appendChild(this.renderer!.ctx.canvas);
      this.word = this.renderer!.word;
    }
  }

});
</script>
