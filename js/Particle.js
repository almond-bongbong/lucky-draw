import { randomNumBetween } from './utils.js';

class Particle {
	constructor() {
		this.radius = innerHeight / 4;
		this.theta = randomNumBetween(0, Math.PI * 2);
		this.radiusFriction = 0;
		this.thetaFriction = 0;
		this.radiusAlpha = 0;
		this.thetaAlpha = 0;
		this.opacity = 0;
		this.maxOpacity = randomNumBetween(0.4, 1);
		this.x = randomNumBetween(0, window.innerWidth);
		this.y = randomNumBetween(0, window.innerHeight);
	}

	start() {
		this.radiusFriction = randomNumBetween(0.95, 1.01);
		this.thetaFriction = randomNumBetween(0.97, 0.99);
		this.radiusAlpha = randomNumBetween(0, 4);
		this.thetaAlpha = randomNumBetween(0.02, 0.04);
	}

	update() {
		this.radiusAlpha *= this.radiusFriction;
		this.thetaAlpha *= this.thetaFriction;
		this.radius += this.radiusAlpha;
		this.theta += this.thetaAlpha;
		this.x += Math.cos(Math.PI - this.theta);
		this.y += Math.sin(Math.PI - this.theta);
		this.opacity = Math.min(this.maxOpacity , this.opacity + 0.01);
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
