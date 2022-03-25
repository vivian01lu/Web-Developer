const add = (x, y) => x + y;
const PI = 3.14159;
const square = x => x * x;


//////////////方式一：可以用module.exports ：
// module.exports.add = add;
// ///----that is what we are going to fill this math variable with
// module.exports.PI = PI;
// module.exports.square = square;
//----这样就可以把需要的变量导出！！

////////////方式二：也可以用这种方式：
// const math = {
//     add: add,
//     PI: PI,
//     square: square
// }
// module.exports = math;

///////////////方式三：或者直接在定义时就用
//--------module.exports.add = (x,y)=>x+y;
//---------module.exports.PI =  3.14159

////////////最优方式：四：exports.square = square
exports.square = square;
exports.PI = PI;
exports.add = add;

