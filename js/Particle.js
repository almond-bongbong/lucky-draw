import { randomNumBetween } from './utils.js';

class Particle {
  constructor() {
    this.opacity = randomNumBetween(0.4, 1);
    this.x = randomNumBetween(0, window.innerWidth);
    this.y = randomNumBetween(0, window.innerHeight);
    this.xAlpha = randomNumBetween(-0.5, 0.5);
    this.yAlpha = randomNumBetween(-0.5, 0.5);
  }

  update() {
    this.x += this.xAlpha;
    this.y += this.yAlpha;

    if (this.x < -100 || this.x > window.innerWidth + 100) {
      this.xAlpha = this.xAlpha * -1;
    }
    if (this.y < -100 || this.y > window.innerHeight + 100) {
      this.yAlpha = this.yAlpha * -1;
    }

    if (this.targetX !== undefined && this.targetY !== undefined) {
      // Move towards target
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      // const dist = Math.sqrt(dx * dx + dy * dy);
      const velX = dx;
      const velY = dy;
      const speed = 1; // adjust this value to change the speed
      this.x += velX * speed;
      this.y += velY * speed;

      console.log(velX, speed);
    }
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
