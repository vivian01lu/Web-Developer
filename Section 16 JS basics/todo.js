let input = prompt("what do")
const todos = ['Collect Chicken eggs', 'Clean Litter Box'];
while (input !== 'quit' && input !== 'q') {
    if (input === 'list') {
        console.log("***************");
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i}:${todos[i]}`);
        }
        console.log("***************");
    } else if (input === 'new') {
        const newTdo = prompt("okay add new");
        todos.push(newTdo);
        console.log(`${newTdo} added to the list!`);
    } else if (input === 'delete') {
        const index = parseInt(prompt('enter index to delete'));
        // 我感觉比较生疏的地方就是我不熟悉这个parseInt(),很多时候会忘记这里的类型
        //还有就是一些方法的混合使用：splice() , Number.isNaN() 等
        if (!Number.isNaN(index)) {
            const deleted = todos.splice(index, 1);
            console.log(`ok deleted ${deleted[0]}`);
        } else {
            console.log('Unknown index');
        }

    }
    input = prompt("what do");

}

console.log("okay quit");