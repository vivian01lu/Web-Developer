const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function print(element) {
//     console.log(element);
// }

// numbers.forEach(print);

//或者也可用匿名函数：anonymous 匿名函数：
// numbers.forEach(function (el) {
//     if (el % 2 === 0) {
//         console.log(el)
//     }

// },



//map method 的使用：要使用return
// const doubles = numbers.map(function (num) {
//     return num * 2;
// })


//例子二：
const movies = [
    {
        title: 'Amadeus',
        score: 99
    },
    {
        title: 'Stand By me',
        score: 85
    },
    {
        title: 'Alien',
        score: 95
    }
]
const titles = movies.map(function (movies) {
    return movies.title.toUpperCase();
})