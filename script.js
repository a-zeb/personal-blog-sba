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
//Display custom, user-friendly error messages if validation fails. (red text)
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
  e.preventDefault();
  //run validations
  //If valid, create a new post object (e.g., with id, title, content, timestamp).
  //Add edit button which enforces validation and updated storage
  //add delete button which updates storage
}
