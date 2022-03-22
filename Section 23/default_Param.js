// function rollDie(numSlides) {
//     if (numSlides === undefined) {
//         numSlides = 6;
//     }
//     return Math.floor(Math.random() * numSlides) + 1;
// }

function rollDie(numSlides = 6) {

    return Math.floor(Math.random() * numSlides) + 1;
}