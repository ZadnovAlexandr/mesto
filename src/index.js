import './index.css';
import { initialCards, 
         openEditBtn,
         openAddBtn,
         formProf,
         formAddCard,
         placesList,
         nameInput,
         jobInput,
         impMestoName,
         mestoURL,
         configValidation
} from "./utils/constants.js"
import Card from "./components/card.js"
import FormValidator from "./components/formValidator.js"
import UserInfo from "./components/userInfo.js"
import Section from "./components/section.js"
import PopupWithForm from "./components/popupWithForm.js"
import PopupWithImage from "./components/popupWithImage.js"

const formProfValidator = new FormValidator(configValidation, formProf);
const formAddValidator = new FormValidator(configValidation, formAddCard);
formProfValidator.enableValidation()
formAddValidator.enableValidation()

const popupPhoto = new PopupWithImage('.popup_type_open-card');
popupPhoto.setEventListeners();

const openPopupPhoto = (name, link) => {
  popupPhoto.openPopup(name, link);
};

const createCard = (item) =>{
  const card = new Card(item, openPopupPhoto) ; 
  return card.create();
};

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  }
}, placesList);

cardsSection.renderItems();

const profileInfo = new UserInfo({
  nameSelector: `.profile__name`, 
  professionSelector: `.profile__profession`
});

const profilePopup = new PopupWithForm('.popup_type_profile', {
  handleSubmitForm: (data) => {
    profileInfo.setUserInfo({
      username: data.name ,
      profession: data.profession,
    });
  },
});

const openProfilePopup = (popup) => {
  const { username, profession } = profileInfo.getUserInfo();
  nameInput.value = username;
  jobInput.value = profession;
  popup.openPopup();
};

openEditBtn.addEventListener("click", () => {
  profilePopup.setEventListeners();
  formProfValidator.hideErrors();
  openProfilePopup(profilePopup);
});

const submitAddCardForm = new PopupWithForm('.popup_type_add-card', {
  handleSubmitForm: () => {
    cardsSection.addItem(
      createCard({
        link: mestoURL.value,
        name: impMestoName.value,
      })
    );
  },
});

submitAddCardForm.setEventListeners();

openAddBtn.addEventListener("click", () => {
  submitAddCardForm.openPopup();
  formAddValidator.hideErrors();
  formAddValidator.disableButton();
});