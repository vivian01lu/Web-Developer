// fetch("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     console.log("RESOLVED!", res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("ERROR!", e);
//   });

// fetch("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     console.log("RESOLVED!", res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     return fetch("https://swapi.dev/api/people/2/");
//   })
//   .then((res) => {
//     console.log("SECOND REQUEST RESOLVED!!!");
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("ERROR!", e);
//   });

// const loadStarWarsPeople = async () => {
//   try {
//     const res = await fetch("https://swapi.dev/api/people/1/");
//     const data = await res.json();
//     console.log(data);
//     const res2 = await fetch("https://swapi.dev/api/people/2/");
//     const data2 = await res2.json();
//     console.log(data2);
//   } catch (e) {
//     console.log("ERROR!!!", e);
//   }
// };

// loadStarWarsPeople();

//////////////// 自己跟练：

// fetch("https://swapi.dev/api/people/1/")
//   .then(res => {
//     console.log("RESOLVED!", res);
//     // res.json().then(data => console.log("JSON DONE", data));
//     //可以用这一行解决，也可以写Return 然后再用then :
//     return res.json();
//   })
//   .then(data => {
//     console.log(data)
//     return fetch("https://swapi.dev/api/people/2/")
//   })
//   .then(res => {
//     console.log("SECOND REQUEST RESOLVED!!");
//     return res.json();
//   })
//   .catch(e => {
//     console.log("ERROR!", e)
//   })


const loadStarWarsPeople = async () => {
  try {
    const res = await fetch("https://swapi.dev/api/people/1/");
    const data = await res.json();
    console.log(data);
    //and if we want second request:

    const res2 = await fetch("https://swapi.dev/api/people/2/");
    const data2 = await res2.json();
    console.log(data2);
  } catch (e) {
    console.log("ERROR!!!,e");
  }
};

loadStarWarsPeople();
