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
    updateBooks();
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

// let btn = document.createElement("button")
// btn.innerHTML = "Delete"
// btn.classList.add("delete-btn")

// let btn2 = document.createElement("button")
// btn2.innerHTML = "Delete2"
// btn2.classList.add("delete-btn")

function updateBooks() {
    document.querySelector(".cards").innerHTML = "";
    myLibrary.forEach((book, i) => {
        let newCard = document.createElement("div");
        newCard.classList.add("book-card")
        document.querySelector(".cards").appendChild(newCard)
        newCard.id = i;
        newCard.innerHTML = formatBook(book);
        let deleteBtn = makeDeleteButton();
        let toggleReadBtn = makeToggleReadButton();
        newCard.appendChild(deleteBtn)
        newCard.appendChild(toggleReadBtn)
    });
};

function formatBook(book) {
    let newCardText = document.createElement("p");
    let br = document.createElement("br")
    let readStatus = book.read ? "Read" : "Not Read"
    newCardText.innerHTML = `Author: ${book.author} <br> <br> Title: ${book.title} <br> <br>  Pages:${book.numPages} <br> <br>  ${readStatus} <br> <br>`
    return newCardText.innerHTML
};

//Function that loops through myLibrary array
//It will display each book to the page
//

function makeDeleteButton() {
    let button = document.createElement("button")
    button.innerHTML = "Delete"
    button.addEventListener("click", deleteBook)
    return button
};

function makeToggleReadButton() {
    let button = document.createElement("button")
    button.innerHTML = "Toggle"
    button.addEventListener("click", toggleBook)
    return button
};

function deleteBook(e) {
    let bookId = e.target.parentNode.id
    myLibrary.splice(bookId, 1);
    updateBooks();
};

function toggleBook(e) {
    let bookId = e.target.parentNode.id
    
    if (myLibrary[bookId].read=== true) {
        myLibrary[bookId].read = false
    } else {
        myLibrary[bookId].read= true
    }
    updateBooks();
};