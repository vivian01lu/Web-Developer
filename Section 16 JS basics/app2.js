const subreddits = ['cringe', 'book', 'chickens', 'funny', 'pics', 'soccer']
for (let i = 0; i < subreddits.length; i++) {
    console.log(`Visit reddit.com/r/${subreddits[i]}`)
}

// new knowledge!!从来没学过这个 for-of 循环
for (let sub of subreddits) {
    console.log(`Visit reddit.com/r/${sub}`);
}

//嵌套for-of 循环的演示

// for (let row of seatingChart) {
//     for (let students of row) {
//         console.log(students);
//     }
// }

//new knowledge :for-in 循环！！！！
const testScore = {
    kim: 90,
    shawn: 91,
    marlon: 72,
    dwayane: 77,
    vonnie: 60
}
////能用for in 获取到testScore中的key
// for (let pe in testScore) {
//     console.log(`${pe} scored ${testScore[pe]}`)
// }
//方法二：
let total = 0;
let scores = Object.values(testScores);
//这是因为直接获取Object的长度是undefined的，必须复制给一个新array才可
for (let score of scores) {
    total += score;
}
console.log(total / scores.length);

// for (let score of Object.values(testScore)) {
//     console.log(score);
// }