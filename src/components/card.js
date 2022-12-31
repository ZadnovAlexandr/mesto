export default class Card {
 
  constructor(data,templateSelector,  onClick, userId, {handleDelet, handleLikeClick}){
    this._data = data;
    this._onClick = onClick;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._userId = userId;
    this.handleDelet = handleDelet;
    this.handleLikeClick = handleLikeClick;
    this.templateSelector = templateSelector
    this._createTempate(); 
  }

  removeCard(){
    this._placeElement.remove();
    this._placeElement = null;
  }

  _handleOpenCardPopup(){
    this._onClick (this._data.name, this._data.link);
  }

  _createTempate(){
    this._template = document.querySelector(this.templateSelector).
    content.querySelector('.place').cloneNode(true)
  }

  create(){
    this._placeElement = this._template;
    this._card = this._placeElement.querySelector('.place__image');
    this._elementName = this._placeElement.querySelector('.place__title');
    this._removeButton = this._placeElement.querySelector('.place__button-delete');
    this._likeActive = this._placeElement.querySelector(`.place__button-like`);
    this._likeCounter = this._placeElement.querySelector('.place__likes-counter')
    this._elementName.textContent = this._data.name;
    this._card.src = this._data.link;
    this._card.alt = this._data.name;
    this.setListeners();

    if(this._ownerId !== this._userId) {
      this._removeButton.style.display = 'none';
    }
    this.countLikes(this._data)
    return this._placeElement;
  }

  isLiked() {
    return this._likes.some(like => like._id === this._userId)
  }

  _countLikesView() {
    this._likeCounter.textContent = this._likes.length;
    this._isLikedCard()
  }
 
  _isLikedCard() {
    if (this.isLiked()) {
      this._likeActive.classList.add('place__button-like_active')
    } else {
      this._likeActive.classList.remove('place__button-like_active')
    }
  }

  countLikes(data) {
    this._likes = data.likes;
    this._countLikesView()
  }

  setListeners(){
    this._card.addEventListener(`click`, () =>  this._handleOpenCardPopup());
    this._removeButton.addEventListener("click", () => {
      this.handleDelet()
    });
    this._likeActive.addEventListener('click', () => {
      this.handleLikeClick(this.isLiked());
    });
  }

}
