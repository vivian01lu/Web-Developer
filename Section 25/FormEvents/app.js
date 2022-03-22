

// const tweetForm = document.querySelector('#tweetForm');
// const tweetsContainer = document.querySelector('#tweets');
// tweetForm.addEventListener('submit', function (e) {
//     e.preventDefault();

//     // const usernameInput = document.querySelectorAll('input')[0];
//     // const tweetInput = document.querySelectorAll('input')[1];
//     const usernameInput = tweetForm.elements.username;
//     const tweetInput = tweetForm.elements.tweet;

//     addTweet(usernameInput.value, tweetInput.value)
//     usernameInput.value = '';
//     tweetInput.value = '';
// });

// const addTweet = (username, tweet) => {
//     const newTweet = document.createElement('li');
//     const bTag = document.createElement('b');
//     bTag.append(username)
//     newTweet.append(bTag);
//     newTweet.append(`- ${tweet}`)
//     tweetsContainer.append(newTweet);
// }

const form = document.querySelector("#shelterForm");
const input = document.querySelector('#catName');
const list = document.querySelector("#cats");

form.addEventListener("submit", function (e) {
    e.preventDefault();//为了让其在提交表单时不跳转到下一页

    const catName = input.value;
    const newLI = document.createElement("LI");
    //新建一个li 去放catName

    newLI.innerText = catName;
    console.log(newLI);
    list.append(newLI)//用这个操作去添加到下面的li 中

    //最后要把h1 input的清空
    input.value = "";//设成空串即可

})