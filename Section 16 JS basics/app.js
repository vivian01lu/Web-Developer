// let random = Math.random();
// if (random < 0.5) {
//     console.log("Your number is less than 0.5");
//     console.log(random);
// }
// if (random >= 0.5) {
//     console.log("Your number is greater than 0.5");
//     console.log(random);
// }

// const dayOfWeek = prompt('enter a day');

// if (dayOfWeek === 'Monday') {
//     console.log("UGHHH i hate mondays!");
// } else if (dayOfWeek === 'Saturday') {
//     console.log("Yay i love Sat");
// } else if (dayOfWeek === 'Friday') {
//     console.log("decent not bad");
// } else {
//     console.log("meg");
// }

const dayOfWeek = 2;
switch (dayOfWeek) {
    case 1:
        console.log("MONDAY");
        break;
    case 2:
        console.log("TUESDAY");
        break;
    default:
        console.log("I dont know");
}
// Guessing a game

let maximum = parseInt(prompt("enter the maximum num"));
while (!maximum) {
    maximum = parseInt(prompt("enter a valid maximum num"));
}
const targetNum = Math.floor(Math.random() * maximum) + 1;
console.log(targetNum);

let guess = parseInt(prompt("First guess"));
let attempts = 1;

while (parseInt(guess) != targetNum) {
    if (guess === 'q') break;
    attempts++;
    if (guess > targetNum) {
        guess = prompt("Too high");
    } else {
        guess = prompt("Too low");
    }
}
if (guess === 'q') {
    console.log("OK,quitting");
} else {
    console.log(`You got it!it took you ${attempts} times`);
}