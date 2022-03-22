const p1Button = document.querySelector('#p1Button')
const p2Button = document.querySelector('#p2Button')
const resetButton = document.querySelector('#reset');

const p1Display = document.querySelector('#p1Display')
const p2Display = document.querySelector('#p2Display')

const winningScoreSelect = document.querySelector('#playto')

let p1Score = 0;
let p2Score = 0;
let winningScore = 5;
let isGameOver = false;



p1Button.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1;
        if (p1Score === winningScore) {
            isGameOver = true;
            p1Display.classList.add('has-text-success');
            p2Display.classList.add('has-text-danger');

            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p1Display.textContent = p1Score;
        // trick1:设置了一个p1Display 和实际的p1Score分开(因为p1Score要进行计算)

    }
})

p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;
        if (p2Score === winningScore) {
            isGameOver = true;
            p2Display.classList.add('has-text-success');
            p1Display.classList.add('has-text-danger');

            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p2Display.textContent = p2Score;
        // trick1:设置了一个p1Display 和实际的p1Score分开(因为p1Score要进行计算)

    }
})

winningScoreSelect.addEventListener('change', function (e) {
    //trick2!!!:这里要先把其转化为int:
    winningScore = parseInt(this.value);
    reset();

})

resetButton.addEventListener('click', reset)//注意：这里应该只传入函数这个对象，加了括号就成了函数执行了

//去定义一个reset function 简化：
function reset() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;//!!!!注意：这里是这样设置其属性 p1Display的

    p1Display.classList.remove('has-text-success', 'has-text-danger');
    p2Display.classList.remove('has-text-success', 'has-text-danger');

    p1Button.disabled = false;
    p2Button.disabled = false;
}
