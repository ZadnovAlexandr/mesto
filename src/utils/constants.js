export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  export const openEditBtn = document.querySelector(`.profile__edit-button`);
  export const openAddBtn = document.querySelector(`.profile__add-button`);
  export const popupProfile = document.querySelector(`.popup_type_profile`);
  export const popupAddCard = document.querySelector(`.popup_type_add-card`);
  export const formProf = document.querySelector(`.form_type_profile`);
  export const formAddCard = document.querySelector(`.form_type_add-card`);
  export const placesList = document.querySelector('.places__list');
  export const nameInput = document.querySelector(`.form__input_theme_name`);
  export const jobInput = document.querySelector(`.form__input_theme_profession`);
  export const impMestoName = document.querySelector(`.form__input_theme_mestoName`);
  export const mestoURL = document.querySelector(`.form__input_theme_mestoURL`);
  export const popupCard = document.querySelector(`.popup_type_open-card`);
