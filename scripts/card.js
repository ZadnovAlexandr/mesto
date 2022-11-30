export class Card {
  template
  data
  _placeElement
  _elementLink
  _elementAlt
  _elementName
  _removeButton
  _card
  _likeButton
  _like
  _onClick

  constructor(data, onClick){
    this.data = data;
    this._onClick = onClick;
    this.getTemplate(); 
  }

  _removeItem(){
    this._placeElement.remove();
  }

  _handleOpenCardPopup(){
    const popupCard = document.querySelector(`.popup_type_open-card`);
    this._onClick (popupCard, this.data.name, this.data.link);
  }

  _likeclick(){
    const selectorActiveLike = `place__button-like_active`;
    this._like.classList.toggle(selectorActiveLike);
  }

  getTemplate(){
    this.template = document.querySelector('.place-template').content
  }

  create(){
    this._placeElement = this.template.cloneNode(true).querySelector('.place');
    this._elementLink = this._placeElement.querySelector('.place__image');
    this._elementAlt = this._placeElement.querySelector('.place__image');
    this._elementName = this._placeElement.querySelector('.place__title');
    this._removeButton = this._placeElement.querySelector('.place__button-delete');
    this._card = this._placeElement.querySelector('.place__image');
    this._likeButton = this._placeElement.querySelector('.place__button-like');
    this._like = this._placeElement.querySelector(`.place__button-like`);
    this._elementName.textContent = this.data.name;
    this._elementLink.src = this.data.link;
    this._elementAlt.alt = this.data.name;
    this.setListeners();
    return this._placeElement;
  }

  setListeners(){
    this._removeButton.addEventListener(`click`, () =>  this._removeItem());
    this._card.addEventListener(`click`, () =>  this._handleOpenCardPopup());
    this._likeButton.addEventListener(`click`,() =>  this._likeclick());
  }
}