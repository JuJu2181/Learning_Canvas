// function to generate random colors 
const getRandomColor = () => {
    // random integer between  0 and 255
    let random_color1 = Math.floor(Math.random() * (255-1)+1);
    let random_color2 = Math.floor(Math.random() * (255-1)+1);
    let random_color3 = Math.floor(Math.random() * (255-1)+1);
    // console.log(`1: ${random_color1}\n2:${random_color2}\n3:${random_color3}`);
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

// rotate and resolveCollision functions needed fot collision of particles
const rotate = (velocity, angle) => {
    const rotatedVelocities = {
        // x = xcos(theta) - ysin(theta)
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        // y = xsin(theta) + ycos(theta)
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }
    return rotatedVelocities;
}

/*
* here it illustrates elastic collision i-e when two objects collide no energy is lost i-e energy is conserved in this case
*  according to resolveCollision function we need to change the velocities of the circles based on their angles as shown in the picture
!  this is based on one dimensional newtonian equation
    ? v1 = (u1(m1-m2) + 2m2u2)/(m1+m2)
    ? v2 = (u2(m2-m1) + 2m1u1)/(m1+m2)
* this equation only works for one dimension but in our case we have an x dimension and a y dimension
* it basically means both the circles need to be parallel and moving in a x direction either from left to right or right to left
! so we need to rotate these circles with the angle created due to collision of these two circles
* then we run one dimensional equation and get their new velocity
* we then finally rotate the circles to original position
*/
const resolveCollision = (particle, otherParticle) => {
    // delVx = Vx1 - Vx2
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    // delVy = Vy1 - Vy2
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    // delX = x2 - x1
    const xDist = otherParticle.x - particle.x;
    // delY = y2 - y1
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        // atan2 function returns a numeric value between -pi and pi representing angle theta of a (x,y) poiny
        // angle = - tan-1(y2-y1/x2-x1)
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        // ? this is the use of one dimensional newtonian equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

// module.exports = { getRandomIntFromRange, getRandomColor, getDistance };
// export in ES6
export default { getRandomIntFromRange, getRandomColor, getDistance, rotate, resolveCollision };