const fs = require('fs');
const folderName = process.argv[2] || 'Project'


//asynchronus version:
// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log("in the callback")
//     if (err) throw err;
// });


// //synchro version
// fs.mkdirSync('Cats');

// console.log("i come after mkdir in the file!")//这一行先输出因为上一个是一个async
try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`)
    fs.writeFileSync(`${folderName}/app.js`)
    fs.writeFileSync(`${folderName}/style.css`)
} catch (e) {
    console.log("ugh oh no!");
    console.log(e)
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!和教程里不一样！！！我创建的Porfolio 没得三个基本file!!!!!!!!!!!!!!!!!!!!!!!着急！！！