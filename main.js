const form = document.getElementById('inputBook');
const titleEl = document.getElementById('inputBookTitle');
const authorEl = document.getElementById('inputBookAuthor');
const yearEl = document.getElementById('inputBookYear');
const bookCompleteEl = document.getElementById('inputBookIsComplete');
const submitBtn = document.getElementById('bookSubmit');

const searchForm = document.getElementById('searchBook');
const searchInput = document.getElementById('searchBookTitle');
const searchSubmit = document.getElementById('searchSubmit');

const incompleteShelf = document.getElementById('incompleteBookshelfList');
const completeShelf = document.getElementById('completeBookshelfList');

let title, author, year, isComplete;
let bookArr = [];
let bookStorage = localStorage.getItem('bookshelf') !== null ? JSON.parse(localStorage.getItem('bookshelf')) : [];

// FUNCTIONS 
const addBook = (title, author, year, isComplete) => {
  let bookObj = {
    id: +new Date(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete
  }

  bookStorage.push(bookObj);
  updateDom(bookStorage);
  updateStorage();
}

const updateDom = (item) => {
  incompleteShelf.innerHTML = '';
  completeShelf.innerHTML = '';
  item.forEach(book => {
    if (book.isComplete === true) {
      completeShelf.innerHTML += `
      <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
  
        <div class="action">
            <button class="green" onclick="changeBook(${book.id})">Belum selesai di Baca</button>
            <button class="red" onclick="deleteBook(${book.id})">Hapus buku</button>
        </div>
      </article>
      `;
    } else if (book.isComplete === false) {
      incompleteShelf.innerHTML += `
      <article class="book_item">
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
  
        <div class="action">
            <button class="green" onclick="changeBook(${book.id})">Selesai dibaca</button>
            <button class="red" onclick="deleteBook(${book.id})">Hapus buku</button>
        </div>
      </article>
      `;
    }
  })
}

const searchBook = (term) => {
  let searchItem = term.trim().toLowerCase();
  let bookName = bookStorage.filter((book) => { return book.title.toString().toLowerCase() === searchItem });
  updateDom(bookName);
  console.log(bookName, searchItem);
}

const changeBook = (id) => {
  let getBook = bookStorage.filter(book => book.id === id);
  getBook[0].isComplete = !getBook[0].isComplete;
  updateDom(bookStorage);
  updateStorage();
}

const deleteBook = (id) => {
  bookStorage = bookStorage.filter(book => book.id !== id);
  updateDom(bookStorage);
  updateStorage();
}

const updateStorage = () => {
  localStorage.setItem('bookshelf', JSON.stringify(bookStorage));
}

const initPage = () => {
  updateDom(bookStorage);
}

// EVENT LISTENERS
form.addEventListener('submit', (e) => {
  title = titleEl.value;
  author = authorEl.value;
  year = yearEl.value;
  isComplete = bookCompleteEl.checked;

  // console.log(title, author, year, isComplete);
  if (title === null || title === '') {
    alert('Masukkan judul untuk menambahkan buku');
  } else if (author === null || author === '') {
    alert('Masukkan nama pengarang untuk menambahkan buku');
  } else if (year === null || year === '') {
    alert('Masukkan tahun terbit untuk menambahkan buku');
  } else {
    addBook(title, author, year, isComplete);
  }

  titleEl.value = '';
  authorEl.value = '';
  yearEl.value = '';
  bookCompleteEl.checked = false;

  e.preventDefault();
});

searchForm.addEventListener('submit', (e) => {
  title = searchInput.value;

  if (title === null || title === '') {
    alert('Masukkan judul untuk mencari buku');
  } else {
    searchBook(title);
  }

  searchInput.value = ''

  e.preventDefault();
});

initPage();


