const toggleButtonState = (formSubmitButtonElement, disablesubmitButtonClass, buttonState) => {
  if (buttonState){
    disableButton(formSubmitButtonElement, disablesubmitButtonClass)
  } else {
  enableButton (formSubmitButtonElement, disablesubmitButtonClass)
  }
};

const disableButton = (buttonElement, disableButtonClass) => {
  buttonElement.classList.add(disableButtonClass);
  buttonElement.disabled = true;   
};
      
const enableButton = (buttonElement, disableButtonClass) => {
  buttonElement.classList.remove(disableButtonClass)
  buttonElement.disabled = false;
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid)
};

const checkInputValidity = (inputElement, errorElement, invalidInputClass) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, invalidInputClass);
  } else {
    showInputError(inputElement, errorElement, invalidInputClass)
  }
};

const showInputError = (inputElement, errorElement, invalidInputClass) => {
  inputElement.classList.add(invalidInputClass);
  errorElement.textContent = inputElement.validationMessage;  
};
    
const hideInputError = (inputElement, errorElement, invalidInputClass) => {
  inputElement.classList.remove(invalidInputClass)
  errorElement.textContent = '';
};

const handleFormInput = (evt, formElement, formSubmitButtonElement, invalidInputClass, disablesubmitButtonClass, inputs) =>{
  const inputElement = evt.target;
  const errorElement = formElement.querySelector(`.form__input-error-${inputElement.name}`)
  checkInputValidity (inputElement, errorElement, invalidInputClass)
  const buttonState = hasInvalidInput(inputs)
  toggleButtonState(formSubmitButtonElement, disablesubmitButtonClass, buttonState)
}

const setEventListeners = (formElement, inputSelector, submitButtonSelektor, invalidInputClass, disablesubmitButtonClass) =>{
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const formSubmitButtonElement = formElement.querySelector(submitButtonSelektor);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener(`input`, (evt) => handleFormInput(evt, formElement, formSubmitButtonElement, invalidInputClass, disablesubmitButtonClass, inputs)); 
  })
}

const handleFormSumbit = (evt) => {
  evt.preventDefault();
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelektor, invalidInputClass, disablesubmitButtonClass }) =>{
  const formsAll = document.querySelectorAll(formSelector);
  formsAll.forEach((formElement) => {
    formElement.addEventListener(`submit`, handleFormSumbit);
    setEventListeners(formElement, inputSelector, submitButtonSelektor, invalidInputClass, disablesubmitButtonClass);
  });
}
    
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  invalidInputClass: 'form__input_theme_error',
  submitButtonSelektor: `.form__button-save`,
  disablesubmitButtonClass: `form__button-save_disabled`
})
