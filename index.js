import Particle from './js/Particle.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio || 1;
let canvasWidth;
let canvasHeight;
const fps = 60;
const interval = 1000 / fps;

const particles = [];

function init() {
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	canvas.style.width = `${canvasWidth}px`;
	canvas.style.height = `${canvasHeight}px`;
	canvas.width = canvasWidth * dpr;
	canvas.height = canvasHeight * dpr;
	ctx.scale(dpr, dpr);
}

function createRing() {
	const PARTICLE_COUNT = 5000;
	for (let i = 0; i < PARTICLE_COUNT; i++) {
		particles.push(new Particle());
	}
}

function render() {
	let now;
	let delta;
	let then = Date.now();

	const frame = () => {
		requestAnimationFrame(frame);

		now = Date.now();
		delta = now - then;
		if (delta < interval) return;

		// clear canvas
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			p.update();
			p.draw(ctx);
			if (p.opacity <= 0 || p.x > canvasWidth || p.y > canvasHeight) {
				particles.splice(particles.indexOf(p), 1);
				particles.push(new Particle());
			}
		}

		then = now - (delta % interval);
	};

	requestAnimationFrame(frame);
}

window.addEventListener('load', () => {
	init();
	createRing();
	render();
});

window.addEventListener('resize', init);
window.addEventListener('click', () => {
	// const ring = document.querySelector('.ring');
	// ring.classList.add('fade-out');
	// particles.forEach((p) => p.start());
});
