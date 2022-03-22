// document.querySelector('button').addEventListener('click', function (evt) {
//     console.log(evt);
// })

//:以下代码会显示：在input进行操作时反应出的代码和键

const input = document.querySelector('input')
input.addEventListener('keydown', function (e) {
    console.log("e.key");//key是letter,the thing that was generated
    console.log("e.code");//code是actual location on the keyboard,an physical key

});

// input.addEventListener('keyup', function () {
//     console.log("pppp");
// });

////可以看到任意一个键或者鼠标的操作的code:
window.addEventListener('keydown', function (e) {
    console.log(e.code);
})

//进阶版本：
window.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowUp':
            console.log("UP!");
        case 'ArrowDown':
            console.log("DOWN!");

    }
});