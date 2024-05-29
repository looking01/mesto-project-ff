import "./pages/index.css";
import { createCardElement, likeRemoveCard, deleteCard } from "./components/card";
import {
  openPopUp,
  closePopUp,
  closeButtonPopUp,
  closeOverlayPopUp,
} from "./components/modal";

import { enableValidation, clearValidation } from "./components/validation";
import { getUserProfile, getCards, shiftCard, editUserProfile, pushNewCard, changeAvatar } from "./components/api";
import { makeLoader } from "./components/loader";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const overlaysPopUp = document.querySelectorAll(".popup");
const buttonsPopUpClose = document.querySelectorAll(".popup__close");

// попап Профиля / Редактирование профиля
const popUpEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popUpEditProfile.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputFormProfileName = formEditProfile.querySelector(".popup__input_type_name");
const inputFormProfileDescription = formEditProfile.querySelector(".popup__input_type_description");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonSubmitEditForm = formEditProfile.querySelector('.popup__button');

//попап Карточки / Добавление карточки
const popUpNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popUpNewCard.querySelector(".popup__form");
const inputFormNewCardTitle = popUpNewCard.querySelector(".popup__input_type_card-name");
const inputFormNewCardLink = popUpNewCard.querySelector(".popup__input_type_url");
const buttonSubmitNewCardForm = formNewCard.querySelector('.popup__button');
const buttonAddCard = document.querySelector(".profile__add-button");

// попап открытия карточки
const popUpZoomCard = document.querySelector(".popup_type_image");
const zoomCardImg = popUpZoomCard.querySelector(".popup__image");
const zoomCardCaption = popUpZoomCard.querySelector('.popup__caption');

// попап удаления карточки
const popUpDeleteCard = document.querySelector('.popup_delete_card');
const formDeleteCard = popUpDeleteCard.querySelector('.popup__form');

// попап Аватара / Редактирование аватара
const avatarImg = document.querySelector('.profile__image');
const popUpAvatar = document.querySelector('.popup_type_avatar_edit');
const formAvatarEdit = popUpAvatar.querySelector('.popup__form');
const inputFormAvatarUrl = formAvatarEdit.querySelector('.popup__input_type_avatar');
const buttonSubmitAvatarForm = formAvatarEdit.querySelector('.popup__button');



const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const placesCardData = {
  card: '.places__item',
  image: '.card__image',
  title: '.card__title',
  buttonLike: '.card__like-button',
  buttonLikeActive: 'card__like-button_is-active',
  likeCounter: '.card__like-counter',
  buttonDelete: '.card__delete-button',
  idDeleteCard: '',
  cardForDelete: ''
}

enableValidation(validationData);

// Рендер карточек

Promise.all([getUserProfile(), getCards()])
  .then(([profile, cards]) => {
    avatarImg.style.backgroundImage = `url('${profile.avatar}')`;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    cards.forEach((card) => {
      addCard(cardsContainer, createCardElement(cardTemplate, card, placesCardData, likeRemoveCard, openPopUpZoomCard, profile._id, handleDeleteCard))
    })
  }).catch((err) => {console.log(err);})

function addCard (cardsContainer, card) {
  cardsContainer.append(card)
}

function createNewCard(cardsContainer, newCardElement, popUpElement) {
  cardsContainer.prepend(newCardElement);
  closePopUp(popUpElement);
}

function handleDeleteCard (cardId, cardElement) {
  openPopUp(popUpDeleteCard)
  placesCardData.idDeleteCard = cardId;
  placesCardData.cardForDelete = cardElement;
}

// Обработчик создания карточки

formNewCard.addEventListener("submit", () => {
  const placeNewData = {
    name: inputFormNewCardTitle.value,
    link: inputFormNewCardLink.value
  }
  makeLoader(true, buttonSubmitNewCardForm);
  return pushNewCard(placeNewData).then(card => {
    createNewCard(cardsContainer, createCardElement(cardTemplate, card, placesCardData, likeRemoveCard, openPopUpZoomCard, card.owner._id, handleDeleteCard), popUpNewCard);
    formNewCard.reset();
  }).catch((err) => {console.log('Ошибка добавления новой карточки '+ err)}).finally(() => {makeLoader(false, buttonSubmitNewCardForm)})
});

// Обработчик открытия попапа добавления новой карточки

buttonAddCard.addEventListener("click", () => {
  clearValidation(formNewCard, validationData);
  openPopUp(popUpNewCard);
});

buttonsPopUpClose.forEach((button) => {
  button.addEventListener("click", closeButtonPopUp);
});

overlaysPopUp.forEach((overlay) => {
  overlay.addEventListener("click", closeOverlayPopUp);
});

// Обработчик удаления добавленной карточки

formDeleteCard.addEventListener('submit', () => {
  submitDelConfirmationForm(placesCardData.idDeleteCard, placesCardData.cardForDelete, popUpDeleteCard)
})

// Функция удаления карточки

function submitDelConfirmationForm(id, card, popUp) {
  shiftCard(id).then(() => {
    deleteCard(card);
    closePopUp(popUp)
  }).catch((err) => {console.log(err)})
}

// Функция редактирование профиля

function handleProfileFormSubmit(title, description, inputTitle, inputDescription, poUpElement) {
  title.textContent = inputTitle;
  description.textContent = inputDescription;
  closePopUp(poUpElement);
}

// Обработчик открытия попапа редактирования профиля

buttonEditProfile.addEventListener("click", () => {
  inputFormProfileName.value = profileTitle.textContent;
  inputFormProfileDescription.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationData);
  openPopUp(popUpEditProfile);
});

// Обработчик сохранения формы редактирования профиля

popUpEditProfile.addEventListener("submit", () => {
  makeLoader(true, buttonSubmitEditForm);
  editUserProfile({name: inputFormProfileName.value, about: inputFormProfileDescription.value}).then(profile => {
    handleProfileFormSubmit(profileTitle, profileDescription, profile.name, profile.about, popUpEditProfile);
  }).catch((err) => console.log(err)).finally(() => {makeLoader(false, buttonSubmitEditForm)})
});

// функция открытия изображения карточки

function openPopUpZoomCard (evt) {
  const picture = evt.target;
  openPopUp(popUpZoomCard);
  zoomCardImg.src = picture.src;
  zoomCardCaption.textContent = picture.alt;
  zoomCardImg.alt = picture.alt;
}

// Обработчик открытия попапа аватара

avatarImg.addEventListener('click', () => {
  clearValidation(popUpAvatar, validationData)
  openPopUp(popUpAvatar);
});

formAvatarEdit.addEventListener('submit', () => {
  makeLoader(true, buttonSubmitAvatarForm);
  changeAvatar(inputFormAvatarUrl.value).then((user) => {
    avatarImg.style.backgroundImage = `url('${user.avatar}')`;
    formAvatarEdit.reset();
    closePopUp(popUpAvatar);
  }).catch((err) => {console.log(err)}).finally(() => {makeLoader(false, buttonSubmitAvatarForm)})
})
