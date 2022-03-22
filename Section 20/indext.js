function sing() {
    console.log("DO");
}

function collectEggs() {

}

const add = function (x, y) {
    return x + y;
}

function add(x, y) {
    return x + y;
}

// HIGER ORDER FUNCTION:Section21: p215

function makeMysteryFunc() {
    const rand = Math.random();
    if (rand > 0.5) {
        return function () {
            console.log("Congrats!I am a good function!");
            console.log("you win");
        }
    } else {
        return function () {
            alert("you are been infected computer virus");
            alert("stop trying to close this window");
        }
    }

}

function isBetween(num) {
    return num >= 50 && num <= 100
}

function makeBetweenFunc(min, max) {
    return function (nums) {
        return nums >= min && nums <= max;
    }
}
const testRange = function (num) {
    return nums >= 100 && nums <= 200;
}

//Method and function:all methods are functions but not all functions are methods
const myMath = {
    PI: 3.14159,
    square: function (num) {
        return num * num;
    },
    cube: function (num) {
        return num ** 3;//num 's power
    }
}



