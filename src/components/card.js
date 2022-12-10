export default class Card {
 
  constructor(data, onClick){
    this._data = data;
    this._onClick = onClick;
    this._createTempate(); 
  }

  _removeItem(){
    this._placeElement.remove();
    this._placeElement = null;
  }

  _likeClick(){
    const selectorActiveLike = `place__button-like_active`;
    this._like.classList.toggle(selectorActiveLike);
  }

  _handleOpenCardPopup(){
    this._onClick (this._data.name, this._data.link);
  }

  _createTempate(){
    this._template = document.querySelector('.place-template').
    content.querySelector('.place').cloneNode(true)
  }

  create(){
    this._placeElement = this._template;
    this._card = this._placeElement.querySelector('.place__image');
    this._elementName = this._placeElement.querySelector('.place__title');
    this._removeButton = this._placeElement.querySelector('.place__button-delete');
    this._like = this._placeElement.querySelector(`.place__button-like`);
    this._elementName.textContent = this._data.name;
    this._card.src = this._data.link;
    this._card.alt = this._data.name;
    this.setListeners();
    return this._placeElement;
  }

  setListeners(){
    this._removeButton.addEventListener(`click`, () =>  this._removeItem());
    this._card.addEventListener(`click`, () =>  this._handleOpenCardPopup());
    this._like.addEventListener(`click`,() =>  this._likeClick());
  }

}

