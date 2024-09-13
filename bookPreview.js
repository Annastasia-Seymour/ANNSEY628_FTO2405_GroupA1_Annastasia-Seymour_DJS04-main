//BookPreview.js
// Step: Create component class (classical inheritance)
class BookPreview extends HTMLElement {
    constructor() {
        super(); /* Grants access to the parent class, so it can inherit its lineage from the HTML
        Like pinocchio becoming a real boy
        Always call super first in a constructor. After calling super(), add 
        custom functionality specific to the new element. */
        this.attachShadow({mode: 'open'}); // Attach Shadow DOM
    }

    connectedCallback() {
        // Called when the component is added to the DOM
        this.render();
    }

    render() {
        const title = this.getAttribute('title');
        const author = this.getAttribute('author');
        const description = this.getAttribute('description');

        // Render the content inside the shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                /*Add styling components */
                .book-preview {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 10px;
                    border-radius: 5px;
                    max-width: 300px;
                    background-color: #f9f9f9;
                }
                .book-title {
                    font-size: 18px;
                    font-weight: bold;
                }
                .book-author {
                    font-size: 16px;
                    color: #555;
                }
                .book-description {
                    font-size: 14px;
                    color: #333;
                }
            </style>
            <div class="book-preview">
                <div class="book-title">${title}</div>
                <div class="book-author">by ${author}</div>
                <div class="book-description">${description}</div>
            </div>
        `;
    }
}

// Export so we can use this custom element
export default BookPreview;
