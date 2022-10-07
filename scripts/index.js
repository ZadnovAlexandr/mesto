const POPUP_ACTIVE = `popup_opened`;

const openEditBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupBtn = popup.querySelector(".popup__button-close");
const formElement = popup.querySelector(".popup__form");

let nameInput = popup.querySelector(".popup__input_theme_name");
let jobInput = popup.querySelector(".popup__input_theme_profession");
let headingName = document.querySelector(".profile__name");
let headingpProfession = document.querySelector(".profile__profession");

function openPopup(){
    popup.classList.add(POPUP_ACTIVE);
};

nameInput.value = headingName.textContent;
jobInput.value = headingpProfession.textContent;

function closePopup(){
    popup.classList.remove(POPUP_ACTIVE);
};

function formSubmitHandler(evt){
    evt.preventDefault();
    headingName.textContent = nameInput.value;
    headingpProfession.textContent = jobInput.value;
    popup.classList.remove(POPUP_ACTIVE);
};

openEditBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);