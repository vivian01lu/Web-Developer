// const jokes = document.querySelector("#jokes");
// const button = document.querySelector("button");

// const addNewJoke = async () => {
//   const jokeText = await getDadJoke();
//   const newLI = document.createElement("LI");
//   newLI.append(jokeText);
//   jokes.append(newLI);
// };

// const getDadJoke = async () => {
//   try {
//     const config = { headers: { Accept: "application/json" } };
//     const res = await axios.get("https://icanhazdadjoke.com/", config);
//     return res.data.joke;
//   } catch (e) {
//     return "NO JOKES AVAILABLE! SORRY :(";
//   }
// };

// button.addEventListener("click", addNewJoke);

///////////////////////////////////
// 自己跟练
const jokes = document.querySelector('#jokes');
// 他咋知道有一个id？

const button = document.querySelector('button');



const addNewJoke = async () => {
  const jokeText = await getDadJoke()//!!!!!注意在这个async 方法中十分常见的 await关键字！
  const newLI = document.createElement('LI');
  newLI.append(jokeText);//----------!!先把内容加到LI中再把LI加到div中！！！！！append() 方法!!从来没用过！
  jokes.append(newLI)//因为这个jokes 在一个div 里
}

const getDadJoke = async () => {//对于这个方法，1：也是异步的 2：为了避免产生错误用了try catch
  try {
    const config = { headers: { Accept: 'application/json' } }//添加axios headers
    const res = await axios.get("https://icanhazdadjoke.com/", config)
    // 不明白为森马要传config 参数
    // console.log(res.data.joke);//咋还能有data 和joke属性
    return res.data.joke;
  } catch (e) {
    return "NO JOKES AVAILABLE!SORRY:("
  }

}
button.addEventListener('click', addNewJoke);//要在生成方法之后在调用否则会报错！





