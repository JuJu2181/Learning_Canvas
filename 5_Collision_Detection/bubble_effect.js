// imports from other modules
import utils from './utils.js';
import { Particle } from './particle.js';

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
let particlesCount;
let defRadius = 8;
let maxRadius = 24;
let particles;

if (window.innerWidth >= 1200) {
    particlesCount = 300;
} else if (window.innerWidth <= 500 || window.innerHeight <= 400) {
    particlesCount = 30;
} else {
    particlesCount = 150;
}

// functions
const init = () => {
    // init code here
    particles = [];
    for (let i = 0; i < particlesCount; i++) {
        const radius = utils.getRandomIntFromRange(defRadius, maxRadius);
        let x = utils.getRandomIntFromRange(radius, canvas.width-radius);
        let y = utils.getRandomIntFromRange(radius, canvas.height - radius);
        const dx = utils.getRandomIntFromRange(-1,1)-0.5;
        const dy = utils.getRandomIntFromRange(-1,1)-0.5;
        const color = utils.getRandomColor();
        // to avoid overlapping of two circles and hence continous collision we will keep generating x and y values for new circle based on x and y values for previous circle
        if (i !== 0) {
            // we skip the check for x and y for the first particle drawn as it can be drawn anywhere
            for (let j = 0; j < particles.length; j++) {
                // compare the distance between the newly created particle and all the previous particles to prevent overlapping of particles when generated
                if (utils.getDistance(x,y,particles[j].x,particles[j].y)-(radius+particles[j].radius)<=0) {
                    x = utils.getRandomIntFromRange(radius, canvas.width - radius);
                    y = utils.getRandomIntFromRange(radius, canvas.height - radius);
                    // once we generate new particles we need to restart the loop to check for the newly generated particles
                    j = -1;
                }
            }
        }
        particles.push(new Particle(x, y, dx, dy, radius, color));
    }
}

const animate = () => {
    // to call animation function recursively
    requestAnimationFrame(animate);
    // to clear the canvas for each draw
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // animation code here
    particles.forEach(particle => {
        particle.update(ctx,particles,canvas,mouse);
    });
}

// event listeners
window.onload = () => {
    console.log('Collision Effect in Canvas');
    init();
    animate();
}

window.onresize = () => {
    canvas.width = 0.8*window.innerWidth;
    canvas.height = 0.6 * window.innerHeight;
    if (window.innerWidth >= 1200) {
        particlesCount = 300;
    } else if (window.innerWidth <= 500 || window.innerHeight <= 400) {
        particlesCount = 30;
    } else {
        particlesCount = 150;
    }
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
