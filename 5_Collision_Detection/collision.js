// imports from other modules
import utils from './utils.js';
import { Circle } from './circle.js';

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
let circle1, circle2;
let oldColor;
// functions
const init = () => {
    // init code here
    circle1 = new Circle(300, 300, 0, 0, 70, 'skyblue');
    circle2 = new Circle(20, 20, 0, 0, 30, 'orange');
    oldColor = circle1.color;
}

const animate = () => {
    // to call animation function recursively
    requestAnimationFrame(animate);
    // to clear the canvas for each draw
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // animation code here
    circle1.update(ctx);
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update(ctx);
    // if the distance between the center of two circles is less than the sum of radii of two circles it means the circles are colliding
    if (utils.getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <= circle1.radius + circle2.radius) {
        console.log('Collision detected');
        circle1.color = circle2.color;
    } else {
        circle1.color = oldColor;
    }
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
