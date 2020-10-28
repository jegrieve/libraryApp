//myLibrary will contain book objects
let myLibrary = [];

//NEW BOOK Button
const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", bringUpInputs);
//Brings up the inputs
function bringUpInputs() {
    const inputs = document.querySelector(".container")
    inputs.style.display = "block";
    newBookButton.style.display = "none";
};
//Book Constructor
function Book(author, title, numPages, read) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
};
//Submit Book Button
const submitButton = document.getElementById("submit-btn")
submitButton.addEventListener("click", addBookToLibrary);

//Clicking submit button will add object to myLibrary array.
function addBookToLibrary() {
    //make sure all inputs are full
    [author, title, numPages, read] = getInputs();
    let newBook = new Book(author, title, numPages, read);
    myLibrary.push(newBook);
};
{/* <input type = "text" id = "author-input" placeholder = "Author">
<input type = "text" id = "title-input" placeholder = "Title">
<input type = "number" id = "pages-input" placeholder = "Number of pages">
<label for ="read-input">Read:</label>
<input type = "checkbox" id = "read-input"> */}
function getInputs() {
    let inputs = [];
    const authorInput = document.getElementById("author-input");
    inputs.push(authorInput.value)
    
    const titleInput = document.getElementById("title-input");
    inputs.push(titleInput.value)

    const numberInput = document.getElementById("pages-input");
    inputs.push(numberInput.value)
 
    const readInput = document.getElementById("read-input");
    inputs.push(readInput.checked)

    resetInputs(authorInput, titleInput, numberInput, readInput)
    return inputs;
}

function resetInputs(author, title, pages, read) {
    author.value = "";
    title.value = "";
    pages.value = "";
    read.checked = false;
}
//Function that loops through myLibrary array
//It will display each book to the page
//