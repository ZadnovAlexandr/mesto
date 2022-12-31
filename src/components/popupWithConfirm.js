import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm =  this._popup.querySelector(".form");
  }

  openPopup(dataRem) {
    super.openPopup();
    this._dataRem = dataRem;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._dataRem();
    })
    super.setEventListeners();
  }

}
