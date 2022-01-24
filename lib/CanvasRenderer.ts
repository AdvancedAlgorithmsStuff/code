export enum TextOrigin {
  TOP_LEFT,
  CENTER
}

export enum Towards {
  RIGHT,
  BOTTOM,
  BOTTOM_RIGHT
}

export default class CanvasRenderer {

  protected readonly canvas: HTMLCanvasElement;
  protected readonly _ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this._ctx = this.canvas.getContext('2d')!;
    this._ctx.font = '20px monospace';
  }

  public get ctx() {
    return this._ctx;
  }

  public get width() {
    return this._ctx.canvas.width;
  }

  public set width(width: number) {
    this._ctx.canvas.width = width;
  }

  public get height() {
    return this._ctx.canvas.height;
  }

  public set height(height: number) {
    this._ctx.canvas.height = height;
  }

  /**
   * Get the current canvas font, in the specified font size (in pixels).
   * @param fontSize
   */
  public getSizedFont(fontSize: number) {
    return this._ctx.font.replace(/\d+px/, `${fontSize}px`);
  }

  public drawText(text: string, x: number, y: number, origin: TextOrigin = TextOrigin.TOP_LEFT) {
    this._ctx.save();

    this._ctx.font = '20px monospace';

    switch (origin) {
      case TextOrigin.CENTER: {
        this._ctx.textAlign = 'center';
        this._ctx.textBaseline = 'middle';
        break;
      }

      case TextOrigin.TOP_LEFT: {
        this._ctx.textAlign = 'start';
        this._ctx.textBaseline = 'top';
        break;
      }
    }

    this._ctx.fillText(text, x, y);
    this._ctx.restore();
  }

  /**
   *
   * @param text The text to draw in the node.
   * @param x The left-most x-position of the node. (Top-left origin point of the node.)
   * @param y The top-most y-position of the node. (Top-left origin point of the node.)
   * @param radius The radius, in pixels. (default is 20)
   */
  public drawNode(text: string, x: number, y: number, {radius = 20, fillInside}: {radius?: number, fillInside?: boolean} = {}) {
    if (fillInside) {
      //TODO: Improve this
      let c = this._ctx.fillStyle;
      this._ctx.fillStyle = "white";
      this._ctx.beginPath();
      this._ctx.ellipse(x + radius, y + radius, radius, radius, 0, 0, Math.PI * 2);
      this._ctx.fill();
      this._ctx.fillStyle = c;
    }
    
    this._ctx.beginPath();
    this._ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    this._ctx.stroke();
    
    this.drawText(text, x + radius, y + radius, TextOrigin.CENTER);
  }

  public joinNodes(
    node1X: number,
    node1Y: number,
    node2X: number,
    node2Y: number,
    towards: Towards,
    nodeRadius: number = 20
  ) {
    let arrowSize = 4;

    this._ctx.beginPath();
    if (towards == Towards.RIGHT) {
      this._ctx.moveTo(node1X + (nodeRadius * 2), node1Y + nodeRadius);
      this._ctx.lineTo(node2X, node2Y + nodeRadius);

      this._ctx.moveTo(node2X, node2Y + nodeRadius);
      this._ctx.lineTo(node2X - arrowSize, node2Y + nodeRadius - arrowSize);

      this._ctx.moveTo(node2X, node2Y + nodeRadius);
      this._ctx.lineTo(node2X - arrowSize, node2Y + nodeRadius + arrowSize);
    } else if (towards == Towards.BOTTOM) {
      this._ctx.moveTo(node1X + nodeRadius, node1Y + (nodeRadius * 2));
      this._ctx.lineTo(node2X + nodeRadius, node2Y);

      this._ctx.moveTo(node2X + nodeRadius, node2Y);
      this._ctx.lineTo(node2X + nodeRadius - arrowSize, node2Y - arrowSize);

      this._ctx.moveTo(node2X + nodeRadius, node2Y);
      this._ctx.lineTo(node2X + nodeRadius + arrowSize, node2Y - arrowSize);
    } else if (towards == Towards.BOTTOM_RIGHT) {
      this._ctx.moveTo(node1X + (nodeRadius * 1.75), node1Y + (nodeRadius * 1.75));
      this._ctx.lineTo(node2X + (nodeRadius * 0.25), node2Y + (nodeRadius * 0.25));

      this._ctx.moveTo(node2X + (nodeRadius * 0.25), node2Y + (nodeRadius * 0.25));
      this._ctx.lineTo(node2X + (nodeRadius * 0.25), node2Y + (nodeRadius * 0.25) - (arrowSize * 1.5));

      this._ctx.moveTo(node2X + (nodeRadius * 0.25), node2Y + (nodeRadius * 0.25));
      this._ctx.lineTo(node2X + (nodeRadius * 0.25) - (arrowSize * 1.5), node2Y + (nodeRadius * 0.25));
    }
    this._ctx.stroke();
  }

}
