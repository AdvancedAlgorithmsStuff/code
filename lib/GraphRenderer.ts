import CanvasRenderer from "./CanvasRenderer";
import { StringIndexed } from "./GraphTools";

export class GraphRender extends CanvasRenderer {

  private nodes: string[];
  private nodesPos: StringIndexed<[number, number]>;
  private selected: string;
  private updatePos: (pos: StringIndexed<[number, number]>) => void;
  private renderCanvas: () => void;
  
  public get pos() {
      return this.nodesPos;
  }

  constructor(canvas: HTMLCanvasElement, nodes: string[], updatePos: (pos: StringIndexed<[number, number]>) => void, renderCanvas: () => void ) {
    super(canvas);
    this.nodes = nodes;
    this.nodesPos = {};
    nodes.forEach(a => this.nodesPos[a] = [0,0]);
    this.selected = '';
    this.updatePos = updatePos;
    this.renderCanvas = renderCanvas;
    updatePos(this.nodesPos);

    let distance = ([x1, y1]: [number, number], x2: number, y2: number) => {
        return Math.sqrt(Math.pow(x1 + 20 -x2, 2) + Math.pow(y1 + 20 -y2, 2));
    }

    let selectNode = (x: number, y: number) => {
        for (let i of this.nodes) {
            let pos = this.nodesPos[i];
            if (distance(pos, x, y) <= 20) {
                this.selected = i;
                return;
            }
        }
    }

    canvas.onmousedown = (e) => {
        selectNode(e.offsetX, e.offsetY);
    }

    canvas.onmousemove = (e) => {
        if (this.selected) {
            this.nodesPos[this.selected] = [e.offsetX - 20, e.offsetY - 20];
            this.render();
            updatePos(this.nodesPos);
        }
    }
    
    canvas.onmouseenter = () => {
        this.selected = '';
        this.render();
    }

    canvas.onmouseleave = canvas.onmouseenter;
    canvas.onmouseup = canvas.onmouseenter;


  }

  public render() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "black";
    for (let i = this.nodes.length-1; i >= 0; i--) {
        let pos = this.nodesPos[this.nodes[i]];
        this.drawNode(
          this.nodes[i],
          pos[0],
          pos[1],
          {fillInside: true}
        );
    }
    if (this.selected) {
        let pos = this.nodesPos[this.selected];
        this.drawNode(
          this.selected,
          pos[0],
          pos[1],
          {fillInside: true}
        );
    }
    this.renderCanvas();
  }

  public updateNodes(nodes: string[]) {
    console.log("t",nodes);
    this.nodes = nodes;
    Object.keys(this.nodesPos).forEach(a => delete this.nodesPos[a]);
    nodes.forEach(a => this.nodesPos[a] = [0, 0]);
    this.render();
    this.updatePos(this.nodesPos);
  }

}