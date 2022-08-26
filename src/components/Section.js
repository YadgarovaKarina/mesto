export class Section {
    constructor ({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._cardContainer = document.querySelector(containerSelector);
    }

    addItem(cardElement) {
        this._cardContainer.prepend(cardElement);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}