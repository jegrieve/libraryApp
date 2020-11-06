class Book {
    constructor(author, title, numPages, read) {
        this.author = author;
        this.title = title;
        this.numPages = numPages;
        this.read = read;
    };
}

let myLibrary = [];

function checkLocalStorage() {
    if (localStorage.length !== 0) {
        getLocalStorage();
    };
};

function getLocalStorage() {
    let storageKeys = Object.keys(localStorage);
    storageKeys.sort();
    storageKeys.forEach((i) => {
        let retrievedObject = localStorage.getItem(i);
        myLibrary.push(JSON.parse(retrievedObject))
    });
    updateBooks();
};

function updateLocalStorage() {
    localStorage.clear();
    myLibrary.forEach((book, i) => {
        let stringifiedBook = JSON.stringify(book)
        localStorage.setItem(i, stringifiedBook)
    })
    updateBooks();
};;

const newBookButton = document.getElementById("new-book");
newBookButton.addEventListener("click", bringUpInputs);

function bringUpInputs() {
    const inputs = document.querySelector(".container")
    inputs.style.display = "block";
    newBookButton.style.display = "none";
};

const submitButton = document.getElementById("submit-btn")
submitButton.addEventListener("click", addBookToLibrary);
submitButton.addEventListener("click", function(e) {
    e.preventDefault();
});


function addBookToLibrary() {
    [author, title, numPages, read] = getInputs();
    let newBook = new Book(author, title, numPages, read);
    myLibrary.push(newBook);
    updateBooks();
    updateLocalStorage();
};

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
    let readStatus = book.read ? "Read &#10003" : "Not Read  &#x2717"
    newCardText.innerHTML = `Author: ${book.author} <br> <br> Title: ${book.title} <br> <br>  Pages:${book.numPages} <br> <br>  ${readStatus} <br> <br>`
    return newCardText.innerHTML
};

function makeDeleteButton() {
    let button = document.createElement("button")
    button.classList.add("delete-btn")
    button.innerHTML = "Delete"
    button.addEventListener("click", deleteBook)
    return button
};

function makeToggleReadButton() {
    let button = document.createElement("button")
    button.classList.add("toggle-btn")
    button.innerHTML = "Toggle"
    button.addEventListener("click", toggleBook)
    return button
};

function deleteBook(e) {
    let bookId = e.target.parentNode.id
    myLibrary.splice(bookId, 1);
    updateBooks();
    updateLocalStorage()
};

function toggleBook(e) {
    let bookId = e.target.parentNode.id
    
    if (myLibrary[bookId].read=== true) {
        myLibrary[bookId].read = false
    } else {
        myLibrary[bookId].read= true
    }
    updateBooks();
    updateLocalStorage()
};

checkLocalStorage();
