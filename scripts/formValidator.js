export class FormValidator {
  _form
  _inputSelector
  _submitButtonSelektor
  _invalidInputClass
  _disablesubmitButtonClass
  _inputList
  _buttonElement
  _inputElement

  constructor(form) {
  this._form = form;
  this._inputSelector = '.form__input',
  this._submitButtonSelektor = `.form__button-save`;
  this._invalidInputClass = 'form__input_theme_error',
  this._disablesubmitButtonClass = `form__button-save_disabled`;
}

_toggleButtonState() {
  if (this._hasInvalidInput(this._inputList)) {
    this.disableButton();
  } else {
    this._enableButton();
  }
}

disableButton() {
  this._buttonElement.classList.add(this._disablesubmitButtonClass);
  this._buttonElement.setAttribute('disabled', true);
}

_enableButton() {
  this._buttonElement.removeAttribute('disabled');
  this._buttonElement.classList.remove(this._disablesubmitButtonClass);
}

_checkInputValidity(_inputElement){
  if (_inputElement.validity.valid) {
    this._hideInputError(_inputElement);
  } else {
    this._showInputError(_inputElement)
  }
};

_showInputError(_inputElement){
  const errorElement = this._form.querySelector(`.form__input-error-${_inputElement.name}`)
  _inputElement.classList.add(this._invalidInputClass);
  errorElement.textContent = _inputElement.validationMessage;
};
    
_hideInputError(_inputElement){
  const errorElement = this._form.querySelector(`.form__input-error-${_inputElement.name}`)
  _inputElement.classList.remove(this._invalidInputClass);
  errorElement.textContent = '';
};

_hasInvalidInput(){
  return this._inputList.some((_inputElement) => !_inputElement.validity.valid)
};

_setEventListeners() {
  this._inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => {
      this._checkInputValidity(_inputElement);
      this._toggleButtonState();
    });
  });
}

enableValidation(){
  this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  this._buttonElement = this._form.querySelector(this._submitButtonSelektor);
  this._setEventListeners();
}

}