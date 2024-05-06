import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopUp, closePopUp, closeButtonPopUp, closeOverlayPopUp } from './scripts/modal';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const overlaysPopUp = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit');
const buttonsPopUpClose = document.querySelectorAll('.popup__close');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = popupEdit.querySelector('.popup__form');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');



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
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove()
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) {
    cardsContainer.append(createCardElement(cardData, deleteCard));
})


buttonProfileEdit.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopUp(popupEdit);
    
});

buttonsPopUpClose.forEach((button) => {
    button.addEventListener('click', closeButtonPopUp);
});

overlaysPopUp.forEach((overlay) => {
    overlay.addEventListener('click', closeOverlayPopUp)
});