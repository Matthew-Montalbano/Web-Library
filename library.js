let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        let readString;
        if (isRead) {
            readString = "already read";
        } else {
            readString = "not read yet";
        }
        return title + " by " + author + ", " + pages + " pages, " + readString;
    }
}

Book.prototype.toggleIsRead = function() {
    this.isRead = !this.isRead;
}

function addBookToLibrary() {
    const title = prompt("Enter the name of the book: ");
    const author = prompt("Enter the author of the book: ");
    const pages = prompt("Enter the number of pages in the book: ");
    const isRead = prompt("Enter whether you read the book or not: ");
    myLibrary.push(new Book(title, author, pages, isRead));
}


function render() {
    const library = document.querySelector(".library");
    clearChildren(library);
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookcard = createBookCard(book, i);
        library.appendChild(bookcard);
    }
}

function clearChildren(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

function createBookCard(book, id) {
    let bookcard = document.createElement("div");
    bookcard.classList.add("book-card");
    bookcard.id = id;
    addTextElements(bookcard, book);
    addButtonRow(bookcard, book);
    return bookcard;
}

function addTextElements(card, book) {
    const title = document.createElement("h3");
    title.textContent = book.title;
    const author = document.createElement("h3");
    author.textContent = book.author;
    const pages = document.createElement("h3");
    pages.textContent = book.pages;
    const isRead = document.createElement("h3");
    isRead.textContent = book.isRead;
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(isRead);
}

function addButtonRow(card, book) {
    const buttonRow = document.createElement("div");
    addRemoveButton(buttonRow);
    addReadButton(buttonRow, book);
    card.appendChild(buttonRow);
}

function addRemoveButton(element) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card-button");
    deleteButton.textContent = "Remove Book";
    deleteButton.addEventListener("click", () => {
        myLibrary.splice(element.id, 1);
        render();
    });
    element.appendChild(deleteButton);
}

function addReadButton(element, book) {
    const readButton = document.createElement("button");
    readButton.classList.add("card-button");
    readButton.textContent = "Mark as Read";
    readButton.addEventListener("click", () => {
        book.toggleIsRead();
        render();
    });
    element.appendChild(readButton);
}

render();
let addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", () => {
    addBookToLibrary();
    render();
});