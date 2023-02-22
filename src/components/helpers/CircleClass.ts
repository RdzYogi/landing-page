type CircleOptions = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  fill?: string;
  stroke?: {
    width: number;
    color: string;
  };
  opacity: number;
}

export class Circle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  fill?: string;
  stroke?: {
    width: number;
    color: string;
  };
  opacity: number;

  constructor(opts: CircleOptions) {
    this.ctx = opts.ctx;
    this.x = opts.x;
    this.y = opts.y;
    this.r = opts.r;
    this.fill = opts.fill;
    this.stroke = opts.stroke;
    this.opacity = opts.opacity;
  }

  draw() {
    this.ctx.globalAlpha = 0.1 ;
    // console.log(this.opacity)
    // const d = new Date();
    // console.log("draw radius", this.r,"at:",d.getSeconds(), d.getMilliseconds());
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.stroke) {
      this.ctx.strokeStyle = this.stroke.color;
      this.ctx.lineWidth = this.stroke.width;
      this.ctx.stroke();
    }
    if (this.fill) {
      this.ctx.fillStyle = this.fill;
      this.ctx.fill();
    }
    this.ctx.closePath();
    this.ctx.globalAlpha = 1;
  }
}
