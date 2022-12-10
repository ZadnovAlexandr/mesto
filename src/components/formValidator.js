export default class FormValidator {
 
  constructor(config, form) {
  this.config = config;
  this._form = form;
  this._inputSelector = config.inputSelector;
  this._submitButtonSelektor = config.submitButtonSelektor;
  this._invalidInputClass = config.invalidInputClass;
  this._disablesubmitButtonClass = config.disablesubmitButtonClass;
}

hideErrors() {
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
  this._enableButton();
}

_toggleButtonState() {
  if (this._hasInvalidInput()) {
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
    this.showInputError(_inputElement)
  }
};

showInputError(_inputElement){
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