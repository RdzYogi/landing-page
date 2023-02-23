type CircleOptions = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  dx: number;
  dy: number;
  fill: string;
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
  dx: number;
  dy: number;
  fill: string;
  stroke?: {
    width: number;
    color: string;
  };
  opacity: number;

  constructor(opts: CircleOptions) {
    this.ctx = opts.ctx;
    this.x = opts.x;
    this.y = opts.y;
    this.dx = opts.dx;
    this.dy = opts.dy;
    this.fill = opts.fill;
    this.stroke = opts.stroke;
    this.opacity = opts.opacity;
  }

  draw() {
    var grd = this.ctx.createRadialGradient(150, 150, 10, 150, 150, 150);
    grd.addColorStop(0, this.fill);
    grd.addColorStop(0.01, "rgba(10,10,10,0)");
    this.ctx.save()


    // r = 0 => 150(max)
    // center = this.x - 150; this.y - 150
    // console.log(this.dx)

    this.ctx.translate(this.x-150 + this.dx ,this.y-150 - this.dy);



    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0,0,300,300);
    this.ctx.restore();
    // this.ctx.globalAlpha = this.opacity ;
    // // console.log(this.opacity)
    // this.ctx.beginPath();
    // this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    // if (this.stroke) {
    //   this.ctx.strokeStyle = this.stroke.color;
    //   this.ctx.lineWidth = this.stroke.width;
    //   this.ctx.stroke();
    // }
    // if (this.fill) {
    //   this.ctx.fillStyle = this.fill;
    //   this.ctx.fill();
    // }
    // this.ctx.closePath();
    // this.ctx.globalAlpha = 1;
  }
}
