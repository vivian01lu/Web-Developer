//////////////////!!!!一定要学会如何用require!
const blue = require('./blue')
const sadie = require('./sadie')
const janet = require('./janet')

//build a array to save
const allCats = [blue, sadie, janet];
// console.log(allCats);

module.exports = allCats;