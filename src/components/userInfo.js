export default class UserInfo {
  
  constructor( {nameSelector, professionSelector, avatarSelector} ) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
    
  getUserInfo() {
    return {
      username: this._name.textContent,
      profession: this._profession.textContent, 
      avatar: this._avatar.src
    }
  }

  setUserAvatar(avatar) {
    this._avatar.style.backgroundImage = `url(${avatar})` ;
  }

  setUserInfo({username, profession}) {
    this._name.textContent = username;
    this._profession.textContent = profession;
  }
  
}