let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

// function to generate random colors 
const getRandomColor = () => {
    // random integer between  0 and 255
    let random_color1 = Math.floor(Math.random() * (255-1)+1);
    let random_color2 = Math.floor(Math.random() * (255-1)+1);
    let random_color3 = Math.floor(Math.random() * (255-1)+1);
    console.log(`1: ${random_color1}\n2:${random_color2}\n3:${random_color3}`);
    let randomColor = `rgba(${random_color1},${random_color2},${random_color3})`;
    return randomColor;
}

// variables for circle animation
// these variables are static and same for all circles
let startAngle = 0;
let endAngle = Math.PI * 2;
let isAnticlockwise = false;
let maxRadius = 50;
let defRadius = 8;
let circlesCount = canvas.width > 800 ? 600 : 400;

// An object for mouse movement
let mouse = {
    x: undefined,
    y:undefined
};

// creating a class for circle
class Circle {
    constructor(x, y,dx,dy,radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = getRandomColor();
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
        // here when the circle bounces in screen, the velocity is reversed so it bounces back
        // here radius parameter needs to be added or subtracted as by defuklt it considers the center but we need to bounce when the edge touches screen
        if (this.x+this.radius > innerWidth || this.x-this.radius < 0) {
            this.dx = -this.dx;
            // change the color once it bounces
            // this.color = getRandomColor();
        }
        
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        // here x determines the velocity of the circle
        this.x += this.dx;
        this.y += this.dy;

        // interactivity between mouse and position of circle
        // if distance is less than 50 and greater than -50 increase the radius of circle 
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius) {
        // to reset the radius to theier default value when the mouse is not on the circle
            this.radius -= 1;
        }

        // we call method draw to draw the circle after circle moves if we call this draw at beginning it creates one static circle
        this.draw();
    }
}





// this function will be called when window is resized to regenerate all the circles
let circleArray = [];
const init = () => {
    circleArray = [];
    // we create 100 circles using for loop and store it in the array
    for (let i = 0; i < circlesCount; i++) {
        // these variables are dynamic and will differ for each circle
        // radius of the circle will be random between 30 and 90
        let radius = Math.floor(Math.random()*defRadius+1);
        // original (x,y) position of the circle
        // Here we use random to randomize initial spawn position of the circle
        // to avoid the circle from spawing in the far side we first subtract the diameter from the total width of screen to avoid spqwning in right side and then add the radius to avoid spawning in left side. Same thing goes for top and bottom
        let x = Math.random() * (innerWidth - radius*2) + radius;
        let y = Math.random()*(innerHeight - radius*2) + radius;
        // dx and dy determine velocity of the circle in x and y directions
        // get the random values for dx and dy
        let dx = (Math.random() - 0.5)*1.5; //-0.5 to generate negative number as random generates number between 0 and 1
        let dy = (Math.random()-0.5)*1.5;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}


// function for all animations
const animate = () => {
    // this requestAnimationFramw will create a loop and will call animate() again and again
    requestAnimationFrame(animate);
    // clearing the canvas in each refresh here the clear starts from 0 ,0 and goes to entire width and height
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // calling update method for each circle in the array
    circleArray.forEach(circle => circle.update());
    
}



// run when windows is loaded
window.onload = () => {
    init();
    animate();
}


// Event Listeners
// for mouse move
window.addEventListener('mousemove', (e) => {
    // we will compare the x and y position of mouse with the x and y of circle to get distance and we will write our logic based on this
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse);
});

// for resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});