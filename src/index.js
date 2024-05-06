import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopUp } from './scripts/modal';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile_title');
const proFileDescription = document.querySelector('.profile__description');
const 


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

    openPopUp(popupEdit);
} )