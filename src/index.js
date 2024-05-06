import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopUp, closePopUp, closeButtonPopUp, closeOverlayPopUp } from './scripts/modal';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const overlaysPopUp = document.querySelectorAll('.popup')
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const buttonsPopUpClose = document.querySelectorAll('.popup__close');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = popUpEdit.querySelector('.popup__form');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');
const buttonAddCard = document.querySelector('.profile__add-button');
const popUpNewCardForm = popUpNewCard.querySelector('.popup__form');
const cardInputTitle = popUpNewCard.querySelector('.popup__input_type_card-name');
const cardLink = popUpNewCard.querySelector('.popup__input_type_url');


function createCardElement(cardData, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });
    return cardElement;

}

function createNewCard(evt) {
    evt.preventDefault();
    const cardData = {};

    cardData.name = cardInputTitle.value;
    cardData.link = cardLink.value;
    
    cardsContainer.prepend(createCardElement(cardData, deleteCard));
    popUpNewCardForm.reset();
}

popUpNewCardForm.addEventListener('submit', createNewCard);

function deleteCard(cardElement) {
    cardElement.remove()
}

initialCards.forEach(function(cardData) {
    cardsContainer.append(createCardElement(cardData, deleteCard));
})

buttonProfileEdit.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopUp(popUpEdit);
    
});

buttonsPopUpClose.forEach((button) => {
    button.addEventListener('click', closeButtonPopUp);
});

overlaysPopUp.forEach((overlay) => {
    overlay.addEventListener('click', closeOverlayPopUp)
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopUp(popUpEdit);
}

profileEditForm.addEventListener('submit', handleFormSubmit);

buttonAddCard.addEventListener('click', () => {
    openPopUp(popUpNewCard);
})

