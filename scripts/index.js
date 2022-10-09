const POPUP_ACTIVE = `popup_opened`;

const openEditBtn = document.querySelector(`.profile__edit-button`);
const popup = document.querySelector(`.popup`);
const closePopupBtn = popup.querySelector(`.popup__button-close`);
const formElement = popup.querySelector(`.form`);

let nameInput = popup.querySelector(`.form__input_theme_name`);
let jobInput = popup.querySelector(`.form__input_theme_profession`);
let headingName = document.querySelector(`.profile__name`);
let headingpProfession = document.querySelector(`.profile__profession`);

function openPopup(){
    popup.classList.add(POPUP_ACTIVE);
};

function handleOpenProfilePopup(){
   nameInput.value = headingName.textContent;
   jobInput.value = headingpProfession.textContent;
   openPopup();
};

function closePopup(){
    popup.classList.remove(POPUP_ACTIVE);
};

function formSubmitHandler(evt){
    evt.preventDefault();
    headingName.textContent = nameInput.value;
    headingpProfession.textContent = jobInput.value;
    closePopup();
};

openEditBtn.addEventListener(`click`, handleOpenProfilePopup);
closePopupBtn.addEventListener(`click`, closePopup);
formElement.addEventListener(`submit`, formSubmitHandler);