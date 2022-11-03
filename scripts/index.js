const selectorOpenedPopup = `popup_opened`;
const selectorActiveLike = `place__button-like_active`;

const selectorDisablesubmitButton = `form__button-save_disabled`;

const openEditBtn = document.querySelector(`.profile__edit-button`);
const openAddBtn = document.querySelector(`.profile__add-button`);

const popupAll = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(`.popup_type_profile`);
const popupAddCard = document.querySelector(`.popup_type_add-card`);
const popupCard = document.querySelector(`.popup_type_open-card`);

const formProf = document.querySelector(`.form_type_profile`);
const formAddCard = document.querySelector(`.form_type_add-card`);
const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('.place-template').content;

const nameInput = document.querySelector(`.form__input_theme_name`);
const jobInput = document.querySelector(`.form__input_theme_profession`);
const headingName = document.querySelector(`.profile__name`);
const headingpProfession = document.querySelector(`.profile__profession`);
const impMestoName = document.querySelector(`.form__input_theme_mestoName`);
const mestoURL = document.querySelector(`.form__input_theme_mestoURL`);
const headingImg = document.querySelector(`.popup__image`);
const headingImgAlt = document.querySelector(`.popup__image`);
const headingSubtitle = document.querySelector(`.popup__subtitle`);

const buttonElemeSave = formAddCard.querySelector(`.form__button-save`);

const createCard = (item) =>{
  const placeElement = placeTemplate.cloneNode(true).querySelector('.place');

  const elementLink = placeElement.querySelector('.place__image');
  const elementAlt = placeElement.querySelector('.place__image');
  const elementName = placeElement.querySelector('.place__title');
  const removeButton = placeElement.querySelector('.place__button-delete');
  const card = placeElement.querySelector('.place__image');
  const btnLike = placeElement.querySelector('.place__button-like');
  const like = placeElement.querySelector(`.place__button-like`);

  elementName.textContent = item.name;
  elementLink.src = item.link;
  elementAlt.alt = item.name;

  removeButton.addEventListener(`click`, () => removeItem(placeElement));
  card.addEventListener(`click`, () => handleOpenCardPopup(elementName, elementLink));
  btnLike.addEventListener(`click`,() => likeclick(like));

   return (placeElement);
};

const likeclick = (like) =>{
  like.classList.toggle(selectorActiveLike);
};

const handleOpenCardPopup = (elementName, elementLink) =>{
  headingSubtitle.textContent = elementName.textContent;
  headingImg.src =  elementLink.src;
  headingImgAlt.alt = elementName.textContent;
  openPopup(popupCard);
};

const removeItem = (placeElement) => {
  placeElement.remove();
};

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
   disableButton(buttonElemeSave, selectorDisablesubmitButton);
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