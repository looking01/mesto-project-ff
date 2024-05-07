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
const popUpEdit = document.querySelector(".popup_type_edit");
const popUpNewCard = document.querySelector(".popup_type_new-card");
const buttonsPopUpClose = document.querySelectorAll(".popup__close");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = popUpEdit.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(".popup__input_type_description");
const buttonAddCard = document.querySelector(".profile__add-button");
const popUpNewCardForm = popUpNewCard.querySelector(".popup__form");
const cardInputTitle = popUpNewCard.querySelector(".popup__input_type_card-name");
const cardLink = popUpNewCard.querySelector(".popup__input_type_url");
const popUpTypeImg = document.querySelector(".popup_type_image");
const popUpImg = popUpTypeImg.querySelector(".popup__image");
const popUpCaption = popUpTypeImg.querySelector('.popup__caption');

// Рендер карточек

initialCards.forEach(function (cardData) {
  cardsContainer.append(createCardElement(cardData, deleteCard, likeCard, openPopUpImg));
});

// Сохранение модального окна создания карточки

function createNewCard(evt) {
  evt.preventDefault();
  const cardData = {};

  cardData.name = cardInputTitle.value;
  cardData.link = cardLink.value;

  cardsContainer.prepend(createCardElement(cardData, deleteCard, likeCard, openPopUpImg));
  popUpNewCardForm.reset();
  closePopUp(popUpNewCard);
}

// Обработчик создания карточки

popUpNewCardForm.addEventListener("submit", createNewCard, closePopUp);

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

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopUp(popUpEdit);
}

buttonProfileEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popUpEdit);
});

profileEditForm.addEventListener("submit", handleFormSubmit);


function openPopUpImg (evt) {
  const cardElement = evt.target.closest('.card');
  openPopUp(popUpTypeImg);

  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  popUpImg.src = cardImg.src;
  popUpCaption.textContent = cardTitle.textContent;
}