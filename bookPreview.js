// BookPreview.js
export default class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Style for the component
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif; /* Match your global font */
                    color: var(--text-color, black); /* Use a variable for text color */
                }
                .preview {
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    overflow: hidden;
                    display: flex;
                    margin: 10px;
                    background: var(--background-color, white);
                }
                .preview__image {
                    width: 100px;
                    height: 150px;
                    object-fit: cover;
                }
                .preview__info {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                }
                .preview__title {
                    font-size: 1.2em;
                    margin: 0;
                }
                .preview__author {
                    color: var(--author-color, grey);
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
