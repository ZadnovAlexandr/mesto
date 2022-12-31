import './index.css';
import {  
         openEditBtn,
         openAddBtn,
         formProf,
         formAddCard,
         formAvatar,
         placesList,
         nameInput,
         jobInput,
         configValidation,
         avatarBtn
} from "./utils/constants.js"
import Card from "./components/card.js"
import FormValidator from "./components/formValidator.js"
import UserInfo from "./components/userInfo.js"
import Section from "./components/section.js"
import PopupWithForm from "./components/popupWithForm.js"
import PopupWithImage from "./components/popupWithImage.js"
import PopupWithConfirm from "./components/popupWithConfirm.js"
import Api from "./components/api.js"

let userId;

const formProfValidator = new FormValidator(configValidation, formProf);
const formAddValidator = new FormValidator(configValidation, formAddCard);
const formAvatarValidation = new FormValidator(configValidation, formAvatar);

formProfValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidation.enableValidation();

const api = new Api({
  baseURL: `https://mesto.nomoreparties.co/v1/cohort-56`,
  headers:{
    authorization: `a5031a5c-1ebc-4267-88e0-f43b05516ede`,
    "Content-Type": "application/json"
  }
});

Promise.all([api.getUserInfo(), api.getInitialCard()])
.then(([user, cards]) => {
  userId = user._id;
  profileInfo.setUserInfo({
    username: user.name,
    profession: user.about,
  });
  cardsSection.renderItems(cards.reverse())
  profileInfo.setUserAvatar(user.avatar)
})
.catch((err) => {
  console.log(err)
})
 
const cardsSection = new Section({
  renderer: (data) => {
    cardsSection.addItem(createCard(data));
  },
  },
placesList);

const createCard = (data) =>{
  const card = new Card(data, '.place-template', openPopupPhoto,  userId, {
    handleDelet: () => {
      popupConfirmation.openPopup(() => {
        api.deleteCard(data._id).then(() => {
          card.removeCard();
          popupConfirmation.closePopup();
        })
        .catch(err => {
          console.log(err);
        })
      });
    },
    handleLikeClick: (likes) => {
      if(!likes) {
        api.addLike(data._id)
        .then((data) => {
          card.countLikes(data)
        })
        .catch((err) => {
          console.log(err)})
      } else {
        api.deleteLike(data._id)
        .then((data) => {
          card.countLikes(data)
        })
        .catch((err) => {
          console.log(err)})
      }
    }}) ; 
  return card.create();
};

const profileInfo = new UserInfo({
  nameSelector: `.profile__name`, 
  professionSelector: `.profile__profession`,
  avatarSelector: ".profile__avatar"
});

const popupConfirmation = new PopupWithConfirm('.popup_type_confirmation');

const popupPhoto = new PopupWithImage('.popup_type_open-card');

const profilePopup = new PopupWithForm('.popup_type_profile', {
  handleSubmitForm: (formData) => {
    profilePopup.loadMesg(true);
    api.editUser(formData).then((formData) => {
      profileInfo.setUserInfo({
        username: formData.name,
        profession: formData.about,
        avatarURL: formData.avatar,
      });
      profilePopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.loadMesg(false);
    })
  },
});

const submitAddCardForm = new PopupWithForm('.popup_type_add-card', {
  handleSubmitForm: (data) => {
  submitAddCardForm.loadMesg(true);
    api.postCreateCard({
      name: data.mestoName,
      link: data.mestoURL
    })
    .then((card) => {
      cardsSection.addItem(createCard(card))
      submitAddCardForm.closePopup()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      submitAddCardForm.loadMesg(false)
    })
}})

const popupAvatarProfile = new PopupWithForm('.popup_type_avatar', {
  handleSubmitForm: (data) => {
    popupAvatarProfile.loadMesg(true);
    api.editAvatar(data)
    .then((userData) => {
      profileInfo.setUserAvatar(userData.avatar);
      popupAvatarProfile.closePopup();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatarProfile.loadMesg(false)
    })
  }
})

const openPopupPhoto = (name, link) => {
  popupPhoto.openPopup(name, link);
};

const openProfilePopup = (popup) => {
  const { username, profession } = profileInfo.getUserInfo();
  nameInput.value = username;
  jobInput.value = profession;
  popup.openPopup();
};

submitAddCardForm.setEventListeners();
profilePopup.setEventListeners();
popupAvatarProfile.setEventListeners();
popupConfirmation.setEventListeners();
popupPhoto.setEventListeners();

avatarBtn.addEventListener('click', () => {
  popupAvatarProfile.openPopup();
  formAvatarValidation.hideErrors();
  formAvatarValidation.disableButton();
})

openEditBtn.addEventListener("click", () => {
  formProfValidator.hideErrors();
  openProfilePopup(profilePopup);
});

openAddBtn.addEventListener("click", () => {
  submitAddCardForm.openPopup();
  formAddValidator.hideErrors();
  formAddValidator.disableButton();
});