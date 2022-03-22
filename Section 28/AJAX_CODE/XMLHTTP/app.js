// NOT AT ALL IMPORTANT TO REMEMBER ANY OF THIS CODE!

// const req = new XMLHttpRequest();

// req.onload = function () {
//   console.log("IT LOADED!!");
//   const data = JSON.parse(this.responseText);
//   console.log(data.name, data.height);
// };

// req.onerror = function () {
//   console.log("ERROR!!!!");
//   console.log(this);
// };

// req.open("GET", "https://swapi.dev/api/people/1/");
// req.send();

///////////////自己跟练:
const req = new XMLHttpRequest();

//two events handler callbacks:
req.onload = function () {//this runs when there is no error
  console.log("it loaded!");
  const data = JSON.parse(this.responseText);
  console.log(data.name, data.height);

}
req.onerror = function () {//this runs when there is a error
  console.log("Error!");
  console.log(this);
}

// nener use this open method
req.open("GET", "https://swapi.dev/api/people/1/");
req.send();

