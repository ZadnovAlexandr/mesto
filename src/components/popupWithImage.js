import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popupSelector.querySelector(`.popup__image`);
    this._name = this._popupSelector.querySelector(`.popup__subtitle`);
  }

  openPopup(name, link) {
    this._link.src = link;
    this._name.alt = name;
    this._name.textContent = name;
    super.openPopup();
  }
}
