import "./pages/index.css";
import { createCardElement, likeCard, deleteCard } from "./components/card";
import {
  openPopUp,
  closePopUp,
  closeButtonPopUp,
  closeOverlayPopUp,
} from "./components/modal";
import { initialCards } from "./scripts/cards";

const cardsContainer = document.querySelector(".places__list");
const overlaysPopUp = document.querySelectorAll(".popup");
const popUpEditProfile = document.querySelector(".popup_type_edit");
const popUpNewCard = document.querySelector(".popup_type_new-card");
const buttonsPopUpClose = document.querySelectorAll(".popup__close");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = popUpEditProfile.querySelector(".popup__form");
const inputFormProfileName = profileEditForm.querySelector(".popup__input_type_name");
const inputFormProfileDescription = profileEditForm.querySelector(".popup__input_type_description");
const buttonAddCard = document.querySelector(".profile__add-button");
const popUpNewCardForm = popUpNewCard.querySelector(".popup__form");
const inputFormNewCardTitle = popUpNewCard.querySelector(".popup__input_type_card-name");
const inputFormNewCardLink = popUpNewCard.querySelector(".popup__input_type_url");
const popUpZoomCard = document.querySelector(".popup_type_image");
const zoomCardImg = popUpZoomCard.querySelector(".popup__image");
const zoomCardCaption = popUpZoomCard.querySelector('.popup__caption');

// Рендер карточек

initialCards.forEach(function (cardData) {
  cardsContainer.append(createCardElement(cardData, deleteCard, likeCard, openPopUpZoomCard));
});

// Сохранение модального окна создания карточки

function createNewCard(evt) {
  evt.preventDefault();
  const cardData = {};

  cardData.name = inputFormNewCardTitle.value;
  cardData.link = inputFormNewCardLink.value;

  cardsContainer.prepend(createCardElement(cardData, deleteCard, likeCard, openPopUpZoomCard));
  popUpNewCardForm.reset();
  closePopUp(popUpNewCard);
}

// Обработчик создания карточки

popUpNewCardForm.addEventListener("submit", createNewCard);

buttonAddCard.addEventListener("click", () => {
  openPopUp(popUpNewCard);
});

buttonsPopUpClose.forEach((button) => {
  button.addEventListener("click", closeButtonPopUp);
});

overlaysPopUp.forEach((overlay) => {
  overlay.addEventListener("click", closeOverlayPopUp);
});

// Редактирование профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputFormProfileName.value;
  profileDescription.textContent = inputFormProfileDescription.value;
  closePopUp(popUpEditProfile);
}

buttonProfileEdit.addEventListener("click", () => {
  inputFormProfileName.value = profileTitle.textContent;
  inputFormProfileDescription.value = profileDescription.textContent;
  openPopUp(popUpEditProfile);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);


function openPopUpZoomCard (evt) {
  const cardElement = evt.target.closest('.card');
  openPopUp(popUpZoomCard);

  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  zoomCardImg.src = cardImg.src;
  zoomCardCaption.textContent = cardTitle.textContent;
  zoomCardImg.alt = cardTitle.textContent;
}