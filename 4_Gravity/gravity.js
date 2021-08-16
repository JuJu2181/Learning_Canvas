// Importing modules from utils.js
import utils from './utils.js';

let canvas = document.querySelector('canvas');
let restart_btn = document.querySelector('.start-btn');
let width = 800;
let height = 600;

canvas.width = width;
canvas.height = height;

let ctx = canvas.getContext('2d');

// function to generate random colors 
// const getRandomColor = () => {
//     // random integer between  0 and 255
//     let random_color1 = Math.floor(Math.random() * (255-1)+1);
//     let random_color2 = Math.floor(Math.random() * (255-1)+1);
//     let random_color3 = Math.floor(Math.random() * (255-1)+1);
//     console.log(`1: ${random_color1}\n2:${random_color2}\n3:${random_color3}`);
//     let randomColor = `rgba(${random_color1},${random_color2},${random_color3})`;
//     return randomColor;
// }

// variables for circle animation
// these variables are static and same for all circles
let startAngle = 0;
let endAngle = Math.PI * 2;
let isAnticlockwise = false;
let maxRadius = 50;
let defRadius = 10;
let circlesCount = 50;
// gravity
let gravity = 1;
let friction = 0.95;
// An object for mouse movement
const mouse = {
    x: width / 2,
    y: height / 2,
};

// creating a class for circle
class Ball {
    constructor(x, y,dx,dy,radius,color) {
        this.x = x;
        this.y = y;
        // for horizontal velcoty
        this.dx = dx;
        // for gravity dy is the vertical velocity
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    // method to draw a circle
    draw() {
        // console.log(`draw cirlce: ${x}m${y}`);
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius, startAngle, endAngle, isAnticlockwise);
        // ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        // ctx.stroke();
        ctx.fill();
    }

    // method to update the position of the circle with changing velocities
    update() {
        // to simulate gravity we need the ball to fall down and then bounce up so for it we need dy
        // here we need to add this.dy to avoid balls stuking when they
        if (this.y + this.radius + this.dy > canvas.height) {
            // when ball bounces down it will bounce up 
            // here we include friction so that the ball will eventually slow down and stop 
            this.dy = -this.dy * friction;
        } else {
            // once the ball bounces up it will again fall due to gravity
            this.dy += gravity;
        }

        // to avoid ball to slip away from left and right under affect of horizontal velocity
        // here if this.dx is not added when checking condition then balls get stuck at righht during rest
        if (this.x + this.radius + this.dx> canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx*friction;
        }
        this.x += this.dx;
        this.y += this.dy;
        // we call method draw to draw the circle after circle moves if we call this draw at beginning it creates one static circle
        this.draw();
    }
}





// this function will be called when window is resized to regenerate all the circles
let ballArray = [];
let ball;
const init = () => {
    ballArray = [];
    // we create 100 circles using for loop and store it in the array
    for (let i = 0; i < circlesCount; i++) {
        let radius = utils.getRandomIntFromRange(defRadius, maxRadius);
        let x = utils.getRandomIntFromRange(radius, canvas.width-radius);
        let y = utils.getRandomIntFromRange(0, canvas.height - radius);
        let dy = utils.getRandomIntFromRange(-5, 5);
        // as the ball can go both left and right in the canvas
        let dx = utils.getRandomIntFromRange(-1, 1);
        let color = utils.getRandomColor();
        ballArray.push(new Ball(x,y,dx,dy,radius,color));
    }
}


// function for all animations
const animate = () => {
    // this requestAnimationFramw will create a loop and will call animate() again and again
    requestAnimationFrame(animate);
    // clearing the canvas in each refresh here the clear starts from 0 ,0 and goes to entire width and height
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillText('Ciao World', mouse.x, mouse.y);
    // calling update method for each circle in the array
    ballArray.forEach(ball => ball.update());
    // ball.update();
}

restart_btn.addEventListener('click', () => {
    init();
});

// run when windows is loaded
window.onload = () => {
    init();
    animate();
}


// Event Listeners
// for mouse move
window.addEventListener('mousemove', (e) => {
    // we will compare the x and y position of mouse with the x and y of circle to get distance and we will write our logic based on this
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // console.log(mouse);
});

// for resizing
window.addEventListener('resize', () => {
    canvas.width = width;
    canvas.height = height;
    init();
});