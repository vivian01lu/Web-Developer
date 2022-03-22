//在starter 基础上将一些相同重复的代码和功能合并
const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),

}//把所有含有p1的对象封装在一起:将其全部储存为p1的propertity

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto')
let winningScore = 3;
let isGameOver = false;


//把更新分数构造出一个generic function:
function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');

            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
        // trick1:设置了一个p1Display 和实际的p1Score分开(因为p1Score要进行计算)

    }
}


p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
});
p2.button.addEventListener('click', function () {
    updateScores(p2, p1);
});

winningScoreSelect.addEventListener('change', function (e) {
    //trick2!!!:这里要先把其转化为int:
    winningScore = parseInt(this.value);
    reset();

})

resetButton.addEventListener('click', reset)//注意：这里应该只传入函数这个对象，加了括号就成了函数执行了

//去定义一个reset function 简化：
function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger')
        p.button.disabled = false;
    }

    // p1.score = 0;
    // p2.score = 0;
    // p1.display.textContent = 0;
    // p2.display.textContent = 0;//!!!!注意：这里是这样设置其属性 p1Display的

    // p1.display.classList.remove('has-text-success', 'has-text-danger');
    // p2.display.classList.remove('has-text-success', 'has-text-danger');

    // p1.button.disabled = false;
    // p2.button.disabled = false;
}//并且次数也可以简化：

