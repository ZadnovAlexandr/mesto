import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector(".form");
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = Array.from(this._popupSelector.querySelectorAll(".form__input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues())
      this.closePopup()
    });
  }
}
