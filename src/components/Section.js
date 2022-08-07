export class Section {
    constructor ({ items, renderer }, cardContainer) {
        this._item = items;
        this._renderer = renderer;
        this._cardContainer = document.querySelector(cardContainer);
    }

    addItem(cardElement) {
        this._cardContainer.prepend(cardElement);
    }

    renderItems() {
        this._item.forEach((item) => {
            this._renderer(item);
        });
    }
}