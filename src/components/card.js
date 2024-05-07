const cardTemplate = document.querySelector('#card-template').content;

function createCardElement(cardData, deleteCallback, likeCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    cardLikeButton.addEventListener('click', () => {
        likeCallback(cardLikeButton)
    }) 
    return cardElement;
};

function deleteCard(cardElement) {
    cardElement.remove()
}

function likeCard(cardLikeButton) {
    if(cardLikeButton.classList.contains('card__like-button_is-active')) {
        cardLikeButton.classList.remove('card__like-button_is-active')
    } else {
        cardLikeButton.classList.add('card__like-button_is-active')
    }
}


export {createCardElement, likeCard, deleteCard}