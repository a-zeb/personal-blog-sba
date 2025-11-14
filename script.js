let formInp = document.getElementById("submitForm");
let titleInp = document.getElementById("title");
let contentInp = document.getElementById("content");
let submitInp = document.getElementById("submitButton");
let blogPosts = document.getElementById("blogPosts");

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
blogPosts.addEventListener("click", updatePost);

//methods
function submit(e) {
  e.preventDefault();
  //run validations
  //If valid, create a new post object (e.g., with id, title, content, timestamp).
  //Add edit button which enforces validation and updated storage
  //toggle save button when edit is clicked
  //add delete button which updates storage
}

function addPost(post) {
  //add logic for a new post here
}

function updatePost(e) {
  //add update post logic here
  //if target.deletebutton then delete
  //if edit button then edit
  //if save button then save
}
