export default class Popup {

  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
    this._popupBtn = this._popup.querySelector(".form__button-save");
  }

  openPopup () {
    this._popup.classList.add(`popup_opened`);
    document.addEventListener("keydown", this._handleEscClose);
  };

 closePopup () {
  this._popup.classList.remove(`popup_opened`);
  document.removeEventListener("keydown", this._handleEscClose);
  };
     
  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  setEventListeners() {
  this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__button-close")
      ) {
        this.closePopup();
      }
    });
  }
  
}