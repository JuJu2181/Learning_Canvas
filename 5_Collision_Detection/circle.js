// variables for circle animation
// these variables are static and same for all circles
let startAngle = 0;
let endAngle = Math.PI * 2;
let isAnticlockwise = false;


// creating a class for circle
export class Circle {
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
    draw(ctx) {
        // console.log(`draw cirlce: ${x}m${y}`);
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius, startAngle, endAngle, isAnticlockwise);
        // ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        // ctx.stroke();
        ctx.fill();
    }

    // method to update the position of the circle with changing velocities
    update(ctx) {
        // main code here
        // we call method draw to draw the circle after circle moves if we call this draw at beginning it creates one static circle
        this.draw(ctx);
    }
}
