const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

// let total = 0;
// for(let price of prices){
//     total+= price
// }
// console.log(total)

// prices.reduce((total,price) => {
//     return total+price
// },)

const total = prices.reduce((total, price) => total + price)


//accumulating the minimum value as we go through the array：

prices.reduce((min, price) => {
    if (price < min) {
        return price;
    }
    return min;
})

//用在movies上： 
movies.reduce((bestMovie, currMovie) => {
    if (currMovie.score > bestMovie.score) {
        return currMovie;
    }
    return bestMovie;
})
