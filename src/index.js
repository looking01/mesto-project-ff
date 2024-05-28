import "./pages/index.css";
import { createCardElement, likeRemoveCard, deleteCard } from "./components/card";
import {
  openPopUp,
  closePopUp,
  closeButtonPopUp,
  closeOverlayPopUp,
} from "./components/modal";

import { enableValidation, clearValidation } from "./components/validation";
import { getUserProfile, getCards, changeLike, shiftCard, editUserProfile, pushNewCard } from "./components/api";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const overlaysPopUp = document.querySelectorAll(".popup");
const buttonsPopUpClose = document.querySelectorAll(".popup__close");

// попап Профиля / Редактирование профиля
const popUpEditProfile = document.querySelector(".popup_type_edit");
const profileEditForm = popUpEditProfile.querySelector(".popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputFormProfileName = profileEditForm.querySelector(".popup__input_type_name");
const inputFormProfileDescription = profileEditForm.querySelector(".popup__input_type_description");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonSubmitEditForm = profileEditForm.querySelector('.popup__button');

//попап Карточки / Добавление карточки
const popUpNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popUpNewCard.querySelector(".popup__form");
const inputFormNewCardTitle = popUpNewCard.querySelector(".popup__input_type_card-name");
const inputFormNewCardLink = popUpNewCard.querySelector(".popup__input_type_url");
const buttonSubmitNewCardForm = newCardForm.querySelector('.popup__button');
const buttonAddCard = document.querySelector(".profile__add-button");

// попап открытия карточки
const popUpZoomCard = document.querySelector(".popup_type_image");
const zoomCardImg = popUpZoomCard.querySelector(".popup__image");
const zoomCardCaption = popUpZoomCard.querySelector('.popup__caption');

// попап удаления карточки
const popUpDeleteCard = document.querySelector('.popup_delete_card');
const deleteCardForm = popUpDeleteCard.querySelector('.popup__form')

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
  buttonLikeActive: '.card__like-button_is-active',
  likeCounter: '.card__like-counter',
  buttonDelete: '.card__delete-button',
  idDeleteCard: '',
  cardForDelete: ''
}

enableValidation(validationData);

// Рендер карточек

Promise.all([getUserProfile(), getCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    cards.forEach((card) => {
      addCard(cardsContainer, createCardElement(cardTemplate, card, placesCardData, likeRemoveCard, openPopUpZoomCard, profile._id, popUpDeleteCard))
    })
  })

function addCard (cardsContainer, card) {
  cardsContainer.append(card)
}

function createNewCard(cardsContainer, newCardElement, popUpElement) {
  cardsContainer.prepend(newCardElement);
  closePopUp(popUpElement);
}


// Обработчик создания карточки

newCardForm.addEventListener("submit", () => {
  const placeNewData = {
    name: inputFormNewCardTitle.value,
    link: inputFormNewCardLink.value
  }
  return pushNewCard(placeNewData).then(card => {
    createNewCard(cardsContainer, createCardElement(cardTemplate, card, placesCardData, likeRemoveCard, openPopUpZoomCard, card.owner._id, popUpDeleteCard), popUpNewCard);
    newCardForm.reset();
  }).catch((err) => {console.log('Ошибка добавления новой карточки '+ err)})
});

buttonAddCard.addEventListener("click", () => {
  clearValidation(newCardForm, validationData);
  openPopUp(popUpNewCard);
});

buttonsPopUpClose.forEach((button) => {
  button.addEventListener("click", closeButtonPopUp);
});

overlaysPopUp.forEach((overlay) => {
  overlay.addEventListener("click", closeOverlayPopUp);
});

deleteCardForm.addEventListener('submit', () => {
  submitDelConfirmationForm(placesCardData.title, placesCardData.cardForDelete, popUpDeleteCard)
})

function submitDelConfirmationForm(id, card, popUp) {
  shiftCard(id).then(() => {
    deleteCard(card);
    closePopUp(popUp)
  }).catch((err) => {console.log(err)})
}

// Редактирование профиля

function handleProfileFormSubmit(title, description, inputTitle, inputDescription, poUpElement) {
  title.textContent = inputTitle;
  description.textContent = inputDescription;
  closePopUp(poUpElement);
}

buttonEditProfile.addEventListener("click", () => {
  inputFormProfileName.value = profileTitle.textContent;
  inputFormProfileDescription.value = profileDescription.textContent;

  clearValidation(profileEditForm, validationData);
  openPopUp(popUpEditProfile);
});

profileEditForm.addEventListener("submit", () => {
  editUserProfile({name: inputFormProfileName.value, about: inputFormProfileDescription.value}).then(profile => {
    handleProfileFormSubmit(profileTitle, profileDescription, profile.name, profile.about, popUpEditProfile);
  }).catch((err) => console.log(err))
});


function openPopUpZoomCard (evt) {
  const picture = evt.target;

  openPopUp(popUpZoomCard);

  zoomCardImg.src = picture.src;
  zoomCardCaption.textContent = picture.alt;
  zoomCardImg.alt = picture.alt;

}