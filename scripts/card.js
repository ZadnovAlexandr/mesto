export class Card {
  #template
  #data
  _placeElement
  _elementName
  _removeButton
  _card
  _like
  _onClick

  constructor(data, onClick){
    this.#data = data;
    this._onClick = onClick;
    this.getTemplate(); 
  }

  _removeItem(){
    this._placeElement.remove();
    this._placeElement = null;
  }

  _handleOpenCardPopup(){
    this._onClick (this.#data.name, this.#data.link);
  }

  _likeclick(){
    const selectorActiveLike = `place__button-like_active`;
    this._like.classList.toggle(selectorActiveLike);
  }

  getTemplate(){
    this.#template = document.querySelector('.place-template').
    content.querySelector('.place').cloneNode(true)
  }

  create(){
    this._placeElement = this.#template;
    this._card = this._placeElement.querySelector('.place__image');
    this._elementName = this._placeElement.querySelector('.place__title');
    this._removeButton = this._placeElement.querySelector('.place__button-delete');
    this._like = this._placeElement.querySelector(`.place__button-like`);
    this._elementName.textContent = this.#data.name;
    this._card.src = this.#data.link;
    this._card.alt = this.#data.name;
    this.setListeners();
    return this._placeElement;
  }

  setListeners(){
    this._removeButton.addEventListener(`click`, () =>  this._removeItem());
    this._card.addEventListener(`click`, () =>  this._handleOpenCardPopup());
    this._like.addEventListener(`click`,() =>  this._likeclick());
  }
}