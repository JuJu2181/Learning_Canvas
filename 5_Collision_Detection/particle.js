import utils from './utils.js';
// a class for particles
// variables for circle animation
// these variables are static and same for all circles
let startAngle = 0;
let endAngle = Math.PI * 2;
let isAnticlockwise = false;


// creating a class for circle
export class Particle {
    constructor(x, y,dx,dy,radius,color) {
        this.x = x;
        this.y = y;
        // velocity of particles
        this.velocity = {
            x: dx,
            y: dy,
        };
        this.radius = radius;
        this.color = color;
        // mass is needed for elastic collison effect
        this.mass = 1;
        // opacity for particles
        this.opacity = 0;
    }

    // method to draw a circle
    draw(ctx) {
        // console.log(`draw cirlce: ${x}m${y}`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, isAnticlockwise);
        // this will save current state of canvas at specific point of time
        ctx.save();
        // for changing global opacity of the canvas
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        // restore the saved values of context
        ctx.restore();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }

    // method to update the position of the circle with changing velocities
    update(ctx,particles,canvas,mouse) {
        // main code here
        // we call method draw to draw the circle after circle moves if we call this draw at beginning it creates one static circle
        this.draw(ctx);
        // now here we will check the distance between the current particle and all other neighboring particles to detect collision
        for (let i = 0; i < particles.length; i++) {
            // we don't need to check the distance for same particle
            if (this === particles[i]) continue
            // here we check whether two particles have collided or not
            // console.log(this.velocity.x);
            // console.log(particles[i].velocity.x);
            if (utils.getDistance(this.x,this.y,particles[i].x,particles[i].y)-(this.radius+particles[i].radius)<=0) {
                // console.log('collided');
                utils.resolveCollision(this, particles[i]);
            }
            // console.log(this.velocity.x);
            // console.log(particles[i].velocity.x);
        
        }
        // for mouse collision detection with circles
        if (utils.getDistance(mouse.x, mouse.y, this.x, this.y) <= 150 && this.opacity < 0.7) {
            this.opacity += 0.04;
            this.radius = this.radius+0.2;
        }else if(this.opacity > 0){
            // to restore to 0 opacity we need to restore the opacity to default 
            this.opacity -= 0.04;
            // here the opacity cannot, should not and will not go below 0
            this.opacity = Math.max(0, this.opacity);
            this.radius = this.radius-0.2;
        }
        // when these particles hit box boundary they will move in opposite direction
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y;
        }
        // for moving particles with velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
