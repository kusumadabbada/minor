const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const genreInput = document.querySelector("#genre");

// Load all books
fetch("/books")
  .then((res) => res.json())
  .then((data) => {
    const books = data.books;
    books.forEach((book) => addBookToList(book));
  })
  .catch((err) => console.log(err));

// Add a book to the list
function addBookToList(book) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${book.title} by ${book.author}</span>
    <button class="delete-btn" data-id="${book._id}">Delete</button>
  `;
  bookList.appendChild(li);
}

// Handle form submission
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const genre = genreInput.value;
  fetch("/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author, genre }),
  })
    .then((res) => res.json())
    .then((data) => {
      const book = data.book;
      addBookToList(book);
      titleInput.value = "";
      authorInput.value = "";
      genreInput.value = "";
    })
    .catch((err) => console.log(err));
});

// Handle delete button click
bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.getAttribute("data-id");
    fetch(`/books/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const book = data.book;
        const li = e.target.parentElement;
        bookList.removeChild(li);
      })
      .catch((err) => console.log(err));
  }
});

const deleteBookForm = document.querySelector('form[action="/books/delete"]');
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookNameInput = document.querySelector("#bookName");
  const bookName = bookNameInput.value;

  fetch(`/books/${bookName}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        bookNameInput.value = "";
        alert("Book deleted successfully!");
        location.reload();
      } else {
        throw new Error("Something went wrong.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Book deletion failed.");
    });
});
