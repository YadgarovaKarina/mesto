export class Card {
  constructor(data, selector, handler) {
    this._data = data;
    this._selector = selector;
    this._onClickHandler = handler.onClick;
    this._onRemoveHandler = handler.onRemove;
    this._onLikeHandler = handler.onLike;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCount = this._element.querySelector('.element__like-counter');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementTitle.textContent = this._data.name;
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    this._likeCount.textContent = this._data.likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
    if (!this.isOwner()) {
      this._deleteButton.remove();
    }
    this._setEventListeners();
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    return this._element;
  }

  isLiked() {
    return this._data.likes.some((item) => {
      return this._data.currentUser._id === item._id
    })
  }

  isOwner() {
    return this._data.currentUser._id === this._data.owner._id
  }

  _handleLike() {
    this._onLikeHandler(
      this._data,
      (updatedLikes) => {
        this._data.likes = updatedLikes;
        const classNameLiked = 'element__like-button_active';
        if (this.isLiked()) {
          this._likeButton.classList.add(classNameLiked);
        } else {
          this._likeButton.classList.remove(classNameLiked);
        }
        this._likeCount.textContent = this._data.likes.length;
      });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._onRemoveHandler(this._data, () => this._handleDeleteCard());
    });

    this._elementImage.addEventListener('click', () => {
      this._onClickHandler(this._data);
    });
  }
};
