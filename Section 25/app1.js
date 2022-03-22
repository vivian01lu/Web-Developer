const btn = document.querySelector('#v2')

btn.onclick = function () {
    console.log("you clicked me!");
    console.log("I hope it worked!");

}

function scream() {
    console.log("aaaaahhhh")
    console.log("Stop touching me")
}

btn.onmouseenter = scream;

document.querySelector('h1').onclick = () => {
    alert('you clicked the h1!');
}
//set the unclick property to a function itself,the value should be a function,the reference should be a function 而不是马上被执行

const btn3 = document.querySelector('#v3');
btn3.addEventListener('click', function () {
    alert("clicked")
})//whatever in this function will be executed if the button is clicked
//此处：第一个参数是type of events 第二个参数是callback,the function we want to run