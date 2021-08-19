// imports from other modules
import utils from './utils.js';
import { SmallParticle } from './circle.js';

// dom selectors
let canvas = document.querySelector('canvas');
let startBtn = document.querySelector('.start-btn');

// variables
let ctx = canvas.getContext('2d');
canvas.width = 0.8*window.innerWidth;
canvas.height = 0.6*window.innerHeight;

// An object for mouse movement
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

// variables used in functions
let particles;
let particlesCount = 50;

// functions
const init = () => {
    // init code here

    particles = [];
    for (let i = 0; i < particlesCount; i++) {
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        // to get random radius from 1 to 3
        let radius = (Math.random()*3)+1;
        let color = utils.getRandomColor();
        particles.push(new SmallParticle(x,y,radius,color));
    }
}

const animate = () => {
    // to call animation function recursively
    requestAnimationFrame(animate);
    // to clear the canvas for each draw
    // TODO: Here if we comment clear rect as the previous circles are not cleared so we get a cool donut like spinner
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    // ! as we need a trail effect for our animation instead of using clear rect we use fillRect as below 
    // here use of alpha value will make the trail transparent
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // animation code here

    particles.forEach(particle => {
        particle.update(ctx,mouse);
    });
    
}

// event listeners
window.onload = () => {
    console.log('Circular Motion Effect in Canvas');
    init();
    animate();
}

window.onresize = () => {
    canvas.width = 0.8*window.innerWidth;
    canvas.height = 0.6 * window.innerHeight;
    init();
}

// for mouse move
window.addEventListener('mousemove', (e) => {
    // here we need to use boundingclient rect to get mouse position accuratey in canvas as the clientX and clientY gives mouse postion refered to the entire window size
    let rect = canvas.getBoundingClientRect();
    // we will compare the x and y position of mouse with the x and y of circle to get distance and we will write our logic based on this
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    // console.log(mouse);
});

startBtn.addEventListener('click', () => {
    console.log('Simulation restarted');
    init();
});
