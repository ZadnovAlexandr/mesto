import { initialCards } from "./constants.js"
import { Card } from "./card.js"
import { FormValidator } from "./formValidator.js"

const selectorOpenedPopup = `popup_opened`;

const openEditBtn = document.querySelector(`.profile__edit-button`);
const openAddBtn = document.querySelector(`.profile__add-button`);

const popupAll = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(`.popup_type_profile`);
const popupAddCard = document.querySelector(`.popup_type_add-card`);

const formProf = document.querySelector(`.form_type_profile`);
const formAddCard = document.querySelector(`.form_type_add-card`);
const placesList = document.querySelector('.places__list');

const nameInput = document.querySelector(`.form__input_theme_name`);
const jobInput = document.querySelector(`.form__input_theme_profession`);
const headingName = document.querySelector(`.profile__name`);
const headingpProfession = document.querySelector(`.profile__profession`);
const impMestoName = document.querySelector(`.form__input_theme_mestoName`);
const mestoURL = document.querySelector(`.form__input_theme_mestoURL`);
const headingImg = document.querySelector(`.popup__image`);
const headingImgAlt = document.querySelector(`.popup__image`);
const headingSubtitle = document.querySelector(`.popup__subtitle`);

const createCard = (item) =>{
  const cards = new Card(item, 
    (handleOpenCardPopup, name, link) =>{
      headingSubtitle.textContent = name;
      headingImg.src = link;
      headingImgAlt.alt = name;
      openPopup(handleOpenCardPopup);
    }
  ); 
  const placeElement = cards.create();
  return (placeElement);
};

const formProfValidator = new FormValidator(formProf);
const formAddValidator = new FormValidator(formAddCard);
formProfValidator.enableValidation()
formAddValidator.enableValidation()


const clearInput = () =>{
  impMestoName.value = ``;
  mestoURL.value = ``;
} 

const addCard = (placeElement) =>{
  placesList.prepend(placeElement); 
};

const createItem = (item) => addCard(createCard(item))

initialCards.forEach(createItem);

const submitAddCardForm = (event) =>{
  event.preventDefault();
  const headingMestoName = impMestoName.value;
  const headingMestoURL = mestoURL.value;
  createItem({
    name: headingMestoName,
    link: headingMestoURL
  })
  closePopup(popupAddCard, event);
};

const openPopup = (popup) => {
  popup.classList.add(selectorOpenedPopup);
  popup.addEventListener("click", closePopupClick);
  document.addEventListener("keydown", closePopupKey);
};
  
const closePopup = (popup) => {
  popup.classList.remove(selectorOpenedPopup);
  popup.removeEventListener("click", closePopupClick);
  document.removeEventListener("keydown", closePopupKey);

};
   
const closePopupClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const closePopupKey = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

popupAll.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__button-close")) {
      closePopup(popup);
    }
  });
});

const openProfilePopup = () =>{
  nameInput.value = headingName.textContent;
  jobInput.value = headingpProfession.textContent;
  openPopup(popupProfile);
};

const openPopupAdd = () => {
  openPopup(popupAddCard)
  formAddValidator.disableButton();
  clearInput()
};

const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  headingName.textContent = nameInput.value;
  headingpProfession.textContent = jobInput.value;
  closePopup(popupProfile);
};

openEditBtn.addEventListener(`click`, openProfilePopup);
openAddBtn.addEventListener(`click`, openPopupAdd);
formProf.addEventListener(`submit`, submitEditProfileForm);
formAddCard.addEventListener(`submit`, submitAddCardForm);