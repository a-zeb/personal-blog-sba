//get inputs
let formInp = document.getElementById("submitForm");
let titleInp = document.getElementById("title");
let contentInp = document.getElementById("content");
let submitInp = document.getElementById("submitButton");

//get local storage
let storedData;
try {
  storedData = localStorage.getItem("storedData");
} catch (error) {
  console.log("unable to retrieve stored data: " + error);
}

//event listeners
formInp.addEventListener("submit", submit);
titleInp.addEventListener("change", (e) => {
  //set validation
});
contentInp.addEventListener("change", (e) => {
  //set validation
});
submitInp.addEventListener("click", (e) => {
  //set validation
});

//methods
function submit(e) {
  //run validations
}
