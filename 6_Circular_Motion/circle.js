// variables for circle animation

import utils from "./utils.js";

// these variables are static and same for all circles
let startAngle = 0;
let endAngle = Math.PI * 2;
let isAnticlockwise = false;


// creating a class for circle
export class SmallParticle {
    constructor(x, y, radius, color) {
        // oldx is the original position of particle before movement
        this.oldx = x;
        this.oldy = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        // radians is needed for circular motion
        // here using random value from 0 to 2pi for the radians we generate circles in different angles in the circular path
        this.radians = Math.random()*Math.PI*2;
        this.velocity = 0.05;
        // for random distance of each circle from center
        //TODO: when we create an object for random x and y distance from center we are getting a 3D look which may be useful for some other type of animations
        // this.distanceFromCenter = {
        //     x: utils.getRandomIntFromRange(50,120),
        //     y: utils.getRandomIntFromRange(50,120),
        // }
        // ? but for our current animation we need to make the distance from center same for both x and y 
        this.distanceFromCenter = utils.getRandomIntFromRange(50, 120);
        // * an object to reference last position of mouse so to make the mouse movement smooth similar to drag effect
        this.lastMouse = {
            x: x,
            y:y,
        };
    }

    // method to draw a circle
    draw(ctx,lastPoint) {
        // console.log(`draw cirlce: ${x}m${y}`);
        ctx.beginPath();
        // ! Using an arc to draw circle doesn't give a smooth effect so we use a line instead, this circle may used for 3d spinner animation
        // ctx.arc(this.x, this.y,this.radius, startAngle, endAngle, isAnticlockwise);
        // // ctx.strokeStyle = this.color;
        // ctx.fillStyle = this.color;
        // // ctx.stroke();
        // ctx.fill();
        // * drawing using line for the trail effect
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        // moveTo takes the coordinates for the particle's previous frame
        // previous position will be obtained from update function
        ctx.moveTo(lastPoint.x,lastPoint.y);
        // lineTo takes the coordinates for the particle's next/new frame
        ctx.lineTo(this.x,this.y);
        ctx.stroke();
        ctx.closePath();
    }

    // method to update the position of the circle with changing velocities
    update(ctx,mouse) {
        // main code here
        // move these points over time by adding velocity to radians
        this.radians += this.velocity;

        // ?drag effect
        // for this drag effect we get the difference between current mouse position and previous mouse position and then we multiply it by 0.05 so that the lastMouse position will change only by 5% of actual distance which ultimately gives smooth drag effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        

        // ? previous position for x and y or particle's previous frame position
        const lastPoint = {
            x: this.x,
            y:this.y
        };
        //* here we don't want to affect each x value by cosine as it will affect the cosine motion but only add cosine to original location of particle so we use oldx value
        // by default for 0 radian the circle moves from -1 to but when we multiply it by 100 it moves from -100 to 100
        // * Circular Motion
        // for making te cirle move with mouse we will replace this.oldx and this.oldy with mouse.x and mouse.y and again for smooth drag effect for mouse movement replace it by lastMouse.x and this.lastMouse.y
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        // using cos in both x and y will give a diagonal motion and it we use sin and cos we will get required circular motion
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        // we call method draw to draw the circle after circle moves if we call this draw at beginning it creates one static circle
        this.draw(ctx,lastPoint);
    }
}
