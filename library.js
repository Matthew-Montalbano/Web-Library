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
    createForm();
    /*
    const title = prompt("Enter the name of the book: ");
    const author = prompt("Enter the author of the book: ");
    const pages = prompt("Enter the number of pages in the book: ");
    const isRead = prompt("Enter whether you read the book or not: ");
    myLibrary.push(new Book(title, author, pages, isRead));
    */
}

function createForm() {
    const main = document.querySelector(".main");
    const form = document.createElement("form");
    form.classList.add('book-form');
    form.innerHTML = `
    <label for="add-book-title">Title: </label>
    <input id="add-book-title" type="text" name="add-book-title">
    <label for="add-book-author">Author: </label>
    <input id="add-book-author" type="text">
    <label for="add-book-pages">Number of Pages: </label>
    <input id="add-book-pages" type="text">
    <label>Have you read this book?</label>
    <div class="add-book-read">
        <input id="add-book-read-yes" type="radio" name="read" value="yes">
        <label for="add-book-read-yes">Yes</label>
        <input id="add-book-pages-no" type="radio" name="read" value="no">
        <label for="add-book-read-no">No</label> 
    </div>
    <input id="submit-book" type="submit" value="Add Book">
    `;
    const submit = form.querySelector("#submit-book");
    main.appendChild(form);
    submit.addEventListener("click", () => {
        const title = form.querySelector("#add-book-title").value;
        const author = form.querySelector("#add-book-author").value;
        const pages = form.querySelector("#add-book-pages").value;
        const isReadChoice = form.querySelector('input[name="read"]:checked').value;
        let isRead = false;
        if (isReadChoice === "yes") {
            isRead = true;
        }
        myLibrary.push(new Book(title, author, pages, isRead));
        console.log(myLibrary);
        main.removeChild(form);
        render();
    });
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