import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

import BookPreview from './bookPreview.js';
// Register the component
customElements.define('book-preview', BookPreview);// do i register it twice?


let page = 1;
let matches = books

//Implement Abstraction
// create Object for books , author and genre
// should the need for more data to be added statically be necessary
class Author {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Book {
    constructor(id, title, author, genres, image, published, description){ // assigns new values
       this.id = id,
       this.title = title,
       this.author = author,
       this.genre = genres,
       this.image = image,
       this.published = published,
       this.description =description;
    }//'this' refers to the specific instance
displayBookInfo(){
    console.log(`${this.title} by ${this.author}, published in ${this.published}`);
    return `${this.title} by ${this.author}, published in ${this.published}`;
    
    }
}
 //create a function for the books that are rendered
 // need to create objects for abstractions

// In your script.js
function renderBookList(bookList, container) {
    const fragment = document.createDocumentFragment();
    for (const { id, image, title, author } of bookList) {
        const bookElement = document.createElement('book-preview');
        bookElement.setAttribute('title', title);
        bookElement.setAttribute('author', authors[author]);
        bookElement.setAttribute('image', image);
        fragment.appendChild(bookElement);
    }
    container.appendChild(fragment);
}


renderBookList(matches.slice(0, BOOKS_PER_PAGE), document.querySelector('[data-list-items]'));
//Calls the function , matches refers to the data that houses the books 
// in the container the input received from the user will fill the parameter to compare with the existing data/books


//Function for the selected Options placed in a function
function renderSelectOptions(data, container, defaultOptionText) {
    const fragment = document.createDocumentFragment();
    const defaultOption = document.createElement('option');
    defaultOption.value = 'any';
    defaultOption.innerText = defaultOptionText;
    fragment.appendChild(defaultOption);

    for (const [id, name] of Object.entries(data)) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        fragment.appendChild(option);
    }
    container.appendChild(fragment);
}

renderSelectOptions(genres, document.querySelector('[data-search-genres]'), 'All Genres');
// called the function
renderSelectOptions(authors, document.querySelector('[data-search-authors]'), 'All Authors');


// this checks if the user has set their OS to prefer a dark theme
//matches will return true if the user does , and false for notDarkThe

document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').enabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
//display the number of remaining items that can be shown, subtracts the total number of books to the number of books
//already on display
//Enabled the show more button

function toggleModal(selector, isOpen) {
    document.querySelector(selector).open = isOpen;
}
// whatever its name is the default parameter will search for it , without me typing it manually
function addClickListener(selector, callback) {
    document.querySelector(selector).addEventListener('click', callback);
}


addClickListener('[data-search-cancel]', () => toggleModal('[data-search-overlay]', false));
//modal disappears when cancel button is clicked making it false. 
addClickListener('[data-settings-cancel]', () => toggleModal('[data-settings-overlay]', false));
addClickListener('[data-header-search]', () => {
    toggleModal('[data-search-overlay]', true);
    document.querySelector('[data-search-title]').focus();
});
addClickListener('[data-header-settings]', () => toggleModal('[data-settings-overlay]', true));
addClickListener('[data-list-close]', () => toggleModal('[data-list-active]', false));



function themeToggle(theme) {
    // ensures the theme is empty
    const isNightMode = theme === 'night';
    // used ternary operator because its either one or the other
    document.documentElement.style.setProperty('--color-dark', isNightMode ? '255, 255, 255' : '10, 10, 20'); 
    document.documentElement.style.setProperty('--color-light', isNightMode ? '10, 10, 20' : '255, 255, 255');
    
}

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    themeToggle(theme)// calls the theme function 
  
    document.querySelector('[data-settings-overlay]').open = false
})

// this function handles form submission when searching for books.
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // gathers form data
    const filters = Object.fromEntries(formData);
    const result = filterBooks(filters);// calls the filterBooks function
    
    updateUIWithFilteredBooks(result);
    closeModal('[data-search-overlay]');// uses selector param
    

}
//function to filter books based on user input for author and genre
function filterBooks(filters) {
    return books.filter((book) => {
        let genreMatch = filters.genre === 'any';
//loops  through book array that matches the userInput
        for (const singleGenre of book.genres) {
            if (singleGenre === filters.genre) {
                genreMatch = true;
                break;
            }
        }
//forces input and existing data to be presented in lowercase, validates input incase user typed in whatever case
        return (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
               (filters.author === 'any' || book.author === filters.author) &&
               genreMatch;
               // if both conditions are met , a book or books will be returned
    });
}

//function updates the UI based on the filtered books
function updateUIWithFilteredBooks(result) {
    page = 1; // resets the page count to 1
    matches = result; // stores the filtered books

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }

    document.querySelector('[data-list-items]').innerHTML = '';// Overwrites/Clears the existing list of books
    const newItems = createBookPreviews(result.slice(0, BOOKS_PER_PAGE)); // calls function for the first page
    document.querySelector('[data-list-items]').appendChild(newItems);
    updateShowMoreButton();// every time the button is clicked it will call the function to update the state of the Show button,
    // based on remaining books
}

// function creates and returns a document fragment containing book previews.
function createBookPreviews(bookList) {
    const fragment = document.createDocumentFragment();
    
    bookList.forEach((book) => {
        const preview = document.createElement('book-preview');
        preview.setAttribute('title', book.title);
        preview.setAttribute('author', authors[book.author]); // Assuming `authors` is a lookup object
        preview.setAttribute('description', book.description);
        preview.setAttribute('image', book.image);
        
        fragment.appendChild(preview);
    });
    
    return fragment;
}



// Function updates show button based on the number of remaining books
function updateShowMoreButton() {
    const remaining = matches.length - (page * BOOKS_PER_PAGE); //calculates how many books are left to display
    document.querySelector('[data-list-button]').disabled = remaining < 1;// disables button if there are no more books to display
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span> 
    `;// updates the button text to show the remaining book count
}

document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmit);

//function loads and displays the next set of books when clicked
function handleShowMoreButtonClick() {
    const newItems = createBookPreviews(matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    //slice() returns the extracted part in a new string ,gets the next page of books from the matches array.
    document.querySelector('[data-list-items]').appendChild(newItems);
    page += 1;// increments the pages
    updateShowMoreButton();//updates show count
}

document.querySelector('[data-list-button]').addEventListener('click', handleShowMoreButtonClick);

//This block opens the modal with book details when a book is clicked.
// function when a book is clicked, it opens the details preview modal with the selected book's information.
function handleBookPreviewClick(event) {
    const activeBook = findActiveBook(event);//Finds the book that was clicked.


    if (activeBook) {
        updateBookDetailsModal(activeBook);
        openModal('[data-list-active]');
    }
}

//function finds the clicked book by searching/verifying the event path.
function findActiveBook(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (node?.dataset?.preview) // Loops through the path to find the first element
            {
            active = books.find(book => book.id === node.dataset.preview);
            break;
        }
    }

    return active;
}

// function populates the modal with the selected book's image, title, author, and description.
function updateBookDetailsModal(book) {
    document.querySelector('[data-list-blur]').src = book.image;
    document.querySelector('[data-list-image]').src = book.image;
    document.querySelector('[data-list-title]').innerText = book.title;
    document.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = book.description;
}

document.querySelector('[data-list-items]').addEventListener('click', handleBookPreviewClick);


//Pretty self explanatory
function openModal(selector) {
    document.querySelector(selector).open = true;
}

function closeModal(selector) {
    document.querySelector(selector).open = false;
}
