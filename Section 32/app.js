const { PI, square } = require('./math');
//we import it stored in this variale we created called 'math'
//////-----now we have access to this entire project

//我要在这里：require a directory
const cats = require('./shelter')

// console.log(PI)
// console.log(square(9));
console.log("require an entire directory", cats);
