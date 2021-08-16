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

// function to generate randomInteger in a range
const getRandomIntFromRange = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// function to calculate distance between two points
const getDistance = (x1, y1, x2, y2) => {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist,2)+Math.pow(yDist,2));
}

// module.exports = { getRandomIntFromRange, getRandomColor, getDistance };
// export in ES6
export default { getRandomIntFromRange, getRandomColor, getDistance };