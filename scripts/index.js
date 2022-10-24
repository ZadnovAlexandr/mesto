const selectorOpenedPopup = `popup_opened`;
const selectorActiveLike = `place__button-like_active`;

const openEditBtn = document.querySelector(`.profile__edit-button`);
const openAddBtn = document.querySelector(`.profile__add-button`);

const popupProfile = document.querySelector(`.popup_type_profile`);
const popupAddCard = document.querySelector(`.popup_type_add-card`);
const popupCard = document.querySelector(`.popup_type_open-card`);

const closeProfBtn = document.querySelector(`.popup__button-close_type_profile`);
const closeAddCardBtn = document.querySelector(`.popup__button-close_type_add-card`);
const closeCard = document.querySelector(`.popup__button-close_type-card`);

const formProf = document.querySelector(`.form_type_profile`);
const formAddCard = document.querySelector(`.form_type_add-card`);
const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('.place-template').content;

const nameInput = document.querySelector(`.form__input_theme_name`);
const jobInput = document.querySelector(`.form__input_theme_profession`);
const headingName = document.querySelector(`.profile__name`);
const headingpProfession = document.querySelector(`.profile__profession`);
const ImpMestoName = document.querySelector(`.form__input_theme_mesto-name`);
const MestoURL = document.querySelector(`.form__input_theme_mesto-URL`);
const headingImg = document.querySelector(`.popup__image`);
const headingImgAlt = document.querySelector(`.popup__image`);
const headingSubtitle = document.querySelector(`.popup__subtitle`);

const openPopup = (popup) =>{
  popup.classList.add(selectorOpenedPopup);
};

const closePopup = (popup) =>{
  popup.classList.remove(selectorOpenedPopup);
};

const removeItem = (element) => {
  element.remove();
};

const clearInput = () =>{
  ImpMestoName.value = ``;
  MestoURL.value = ``;
} 

const createCard = (item) =>{
  const placeElement = placeTemplate.cloneNode(true).querySelector('.place');

  const elementLink = placeElement.querySelector('.place__image');
  const elementAlt = placeElement.querySelector('.place__image');
  const elementName = placeElement.querySelector('.place__title');
  const removeButton = placeElement.querySelector('.place__button-delete');
  const card = placeElement.querySelector('.place__image');
  const ButLike = placeElement.querySelector('.place__button-like');
  const like = placeElement.querySelector(`.place__button-like`);

  elementLink.src = item.link;
  elementAlt.alt = item.name;
  elementName.textContent = item.name;

  const likeclick = () =>{
    like.classList.toggle(selectorActiveLike);
  };

  const handleOpenCardPopup = () =>{
    headingSubtitle.textContent = elementName.textContent;
    headingImg.src =  elementLink.src;
    headingImgAlt.alt = elementName.textContent;
    openPopup(popupCard);
  };

  removeButton.addEventListener(`click`, () => removeItem(placeElement));
  card.addEventListener(`click`, () => handleOpenCardPopup(placeElement));
  ButLike.addEventListener(`click`,() => likeclick(placeElement));

   return (placeElement);
};

const addCard = (placeElement) =>{
  placesList.prepend(placeElement); 
};

const createItem = (item) => addCard(createCard(item))

initialCards.forEach(createItem);

const handleSubmit = (event) =>{
  event.preventDefault();
  const headingMestoName = ImpMestoName.value;
  const headingMestoURL = MestoURL.value;
  createItem({
    name: headingMestoName,
    link: headingMestoURL
  })
  closePopup(popupAddCard);
  clearInput()
};
 
const handleOpenProfilePopup = () =>{
  nameInput.value = headingName.textContent;
  jobInput.value = headingpProfession.textContent;
  openPopup(popupProfile);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  headingName.textContent = nameInput.value;
  headingpProfession.textContent = jobInput.value;
  closePopup(popupProfile);
};

openEditBtn.addEventListener(`click`, handleOpenProfilePopup);
openAddBtn.addEventListener(`click`, () => openPopup(popupAddCard));
closeProfBtn.addEventListener(`click`, () => closePopup(popupProfile));
closeAddCardBtn.addEventListener(`click`, () => closePopup(popupAddCard));
closeCard.addEventListener(`click`, () => closePopup(popupCard));
formProf.addEventListener(`submit`, formSubmitHandler);
formAddCard.addEventListener(`submit`, handleSubmit);