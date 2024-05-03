// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list')
// @todo: Функция создания карточки
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