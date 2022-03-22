//the default format:
// const add = function(x,y){
//     return x+y;
// }

// const add = (x, y) => {
//     return x + y;
// }

const square = x => {
    return x * x;
}

// const rolldie = () => {
//     return Math.floor(Math.random() * 6) + 1;
// }

//!!!!!!!!!!!!!!implicit returns:
const rolldie = () => (
    Math.floor(Math.random() * 6) + 1
)

const add = (a, b) => a + b //implicit return 省略了return,(),{}
//并且不管怎么样都只能写single expression