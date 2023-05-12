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
	const PARTICLE_COUNT = 1;
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
		}

		then = now - (delta % interval);
	};

	requestAnimationFrame(frame);
}

function getTextPixels(text, fontSize, fontFamily) {
	const offscreenCanvas = document.createElement('canvas');
	offscreenCanvas.width = canvas.width;
	offscreenCanvas.height = canvas.height;

	const offscreenCtx = offscreenCanvas.getContext('2d');
	offscreenCtx.font = `${fontSize}px ${fontFamily}`;
	offscreenCtx.fillText(text, canvas.width / 2, canvas.height / 2);

	const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height);
	const pixels = [];

	for(let y = 0; y < canvas.height; y++) {
		for(let x = 0; x < canvas.width; x++) {
			const alpha = imageData.data[(y * canvas.width + x) * 4 + 3];
			if(alpha > 0) {
				pixels.push({ x, y });
			}
		}
	}

	return pixels;
}

window.addEventListener('load', () => {
	init();
	createRing();
	render();
});

window.addEventListener('resize', init);
window.addEventListener('click', () => {
	const textPixels = getTextPixels('10289', 70, 'Arial');
	for(let i = 0; i < particles.length; i++) {
		const p = particles[i];
		const targetPixel = textPixels[i % textPixels.length];
		p.setTarget(targetPixel.x, targetPixel.y);
	}
});
