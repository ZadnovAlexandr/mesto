import './index.css';
import { initialCards, 
         openEditBtn,
         openAddBtn,
         popupProfile,
         popupAddCard,
         formProf,
         formAddCard,
         placesList,
         nameInput,
         jobInput,
         impMestoName,
         mestoURL,
         popupCard
} from "./utils/constants.js"
import Card from "./components/card.js"
import FormValidator from "./components/formValidator.js"
import UserInfo from "./components/userInfo.js"
import Section from "./components/section.js"
import PopupWithForm from "./components/popupWithForm.js"
import PopupWithImage from "./components/popupWithImage.js"

const popupPhoto = new PopupWithImage(popupCard);
popupPhoto.setEventListeners();

const openPopupPhoto = (name, link) => {
  popupPhoto.openPopup(name, link);
};

const createCard = (item) =>{
  const cards = new Card(item, openPopupPhoto) ; 
  const placeElement = cards.create();
  return (placeElement);
};

const createItem = new Section({
  items: initialCards,
  renderer: (item) => {
      createItem.addItem(createCard(item));
  }
}, placesList);

createItem.renderItems();

const profileInfo = new UserInfo({
  nameSelector: `.profile__name`, 
  professionSelector: `.profile__profession`
});

const profileModal = new PopupWithForm(popupProfile, {
  handleSubmitForm: (data) => {
    profileInfo.setUserInfo({
      username: data.name ,
      profession: data.profession,
    });
  },
});

const openProfileModal = (popup) => {
  const { username, profession } = profileInfo.getUserInfo();
  nameInput.value = username;
  jobInput.value = profession;
  popup.openPopup();
};

openEditBtn.addEventListener("click", () => {
  profileModal.setEventListeners();
  formProfValidator.hideErrors();
  openProfileModal(profileModal);
});

const clearInput = () =>{
  impMestoName.value = ``;
  mestoURL.value = ``;
} 

const submitAddCardForm = new PopupWithForm(popupAddCard, {
  handleSubmitForm: () => {
    createItem.addItem(
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
  clearInput();
});

const formProfValidator = new FormValidator(formProf);
const formAddValidator = new FormValidator(formAddCard);
formProfValidator.enableValidation()
formAddValidator.enableValidation()