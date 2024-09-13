//BookPreview.js
// Step: Create component class (classical inheritance)
// thought importing might help import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
// Export so we can use this custom element
export default class BookPreview extends HTMLElement {
    constructor() {
        super();/* Grants access to the parent class, so it can inherit its lineage from the HTML
        Like pinocchio becoming a real boy
        Always call super first in a constructor. After calling super(), add 
        custom functionality specific to the new element. */
        this.attachShadow({ mode: 'open' });

     // Render the content inside the shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif; /* Match your global font */
                    color: var(--text-color, black); /* Use a variable for text color */
                }
                .preview {
                    border-width: 0;
                    width: 100%;
                    font-family: Roboto, sans-serif;
                    padding: 0.5rem 1rem;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    text-align: left;
                    border-radius: 8px;
                    border: 1px solid rgba(var(--color-dark), 0.15);
                    background: rgba(var(--color-light), 1);
                }
                .preview__image {
                   width: 48px;
                height: 70px;
                    object-fit: cover;
                background: grey;
                    border-radius: 2px;
                 box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                     0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
                }
                .preview__info {
                    padding: 1rem;
                   
                }
                .preview__title {
                    margin: 0 0 0.5rem;
                    font-weight: bold;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                    color: rgba(var(--color-dark), 0.8)
                }
                .preview__author {
                     color: rgba(var(--color-dark), 0.4);
                }
            </style>
            <div class="preview">
                <img class="preview__image" src="" alt="Book cover">
                <div class="preview__info">
                    <h3 class="preview__title"></h3>
                    <div class="preview__author"></div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        // Called when the component is added to the DOM
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Unknown Title';
        const author = this.getAttribute('author') || 'Unknown Author';
        const image = this.getAttribute('image') || '';

        this.shadowRoot.querySelector('.preview__title').textContent = title;
        this.shadowRoot.querySelector('.preview__author').textContent = author;
        this.shadowRoot.querySelector('.preview__image').src = image;
    }
}

//customElements.define('book-preview', BookPreview);
