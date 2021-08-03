// selector
let canvas = document.querySelector('canvas');
// setting canvas width and height to full width and height of page
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// function to generate random colors 
const getRandomColor = () => {
    // random integer between  0 and 255
    let random_color1 = Math.floor(Math.random() * 255);
    let random_color2 = Math.floor(Math.random() * 255);
    let random_color3 = Math.floor(Math.random() * 255);
    console.log(`1: ${random_color1}\n2:${random_color2}\n3:${random_color3}`);
    let randomColor = `rgba(${random_color1},${random_color2},${random_color3})`;
    return randomColor;
}

// context ctx is a superobject that holds all the drawing functions
let ctx = canvas.getContext('2d');
// fillRect to create a rectangle xpos,ypos,width,height
ctx.fillRect(100, 100, 50, 50);
// specify the color of the rectangle
ctx.fillStyle = 'rgba(255,0,0,0.3)';
// fillrect will take the style specified before it 
ctx.fillRect(400, 400, 50, 50);
ctx.fillStyle = "#00ff0033";
ctx.fillRect(600, 300, 50, 50);

// Line
// this indicates beginning of a path
// in this system 0 is at top and left and it increases as we go to bottom or right
const drawLine = () => {
    ctx.beginPath();
    let x1 = Math.random() * window.innerWidth;
    let y1 = Math.random() * window.innerHeight;
    let x2 = Math.random() * window.innerWidth;
    let y2 = Math.random() * window.innerHeight;
    let x3 = Math.random() * window.innerWidth;
    let y3 = Math.random() * window.innerHeight;
    // this indicates start of the line
    ctx.moveTo(x1, y1);
    // this indicates end of the line
    ctx.lineTo(x2, y2);
    // we can use lineTo extend the lines 
    ctx.lineTo(x3, y3);
    // for line color we use strokeStyle 
    // color can be rgba, hex , color name 
    // ctx.strokeStyle = 'blue';
    ctx.strokeStyle = getRandomColor();
    // until stroke or fill is called the line will not be drawn
    ctx.stroke();
}


// Arc/Circle
const drawArc = () => {
     // creating multiple random circles
     let x = Math.random()* window.innerWidth;
     let y = Math.random()*window.innerHeight;
     // if we don't explicitly specify beginPath then the arc will be conneted to previous path i-e the line 
     ctx.beginPath();
     // arc(x,y,radius,startAngle,endAngle,anticlockwise)
     // here the start and end angle are in radians
    // for a circle start from 0 to 2PI radians
     ctx.arc(x, y, 50, 0, Math.PI * 2, false);
     // ctx.strokeStyle = "red";
     // random color for each circle 
    ctx.strokeStyle = getRandomColor();
     // similar to lines we need to use stroke function to show the circle
     ctx.stroke();
}

// drawing multiple lines and circles
for (let i = 0; i < 30; i++) {
    drawLine();
    drawArc();
}