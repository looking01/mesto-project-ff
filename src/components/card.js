

// Создание карточек

import { openPopUp } from "./modal";

function createCardElement(templateEle, serverData,  cardData, likeCallback, imgPopUpCallback, profileId, popUpDeleteCard) {
  const cardElement = getCardTemplate(templateEle, cardData.card);
  const cardTitle = cardElement.querySelector(cardData.title);
  const cardImage = cardElement.querySelector(cardData.image);
  const deleteButton = cardElement.querySelector(cardData.buttonDelete);
  const cardLikeButton = cardElement.querySelector(cardData.buttonLike);

  cardImage.src = serverData.link;
  cardImage.alt = serverData.name;
  cardTitle.textContent = serverData.name;

  cardImage.addEventListener('click', imgPopUpCallback)

  if (checkLike(serverData.likes, profileId)) {
    cardLikeButton.classList.add(cardData.buttonLikeActive)
  }

  if (serverData.owner._id === profileId) {
    openPopUp(popUpDeleteCard);
    cardData.idDeleteCard = serverData._id;
    cardData.cardForDelete = evt.target.closest(cardData.card)
  } else {
    deleteButton.remove();
  }




  cardLikeButton.addEventListener("click", (evt) => {
    likeCallback()
  });

  cardImage.addEventListener("click", imgPopUpCallback)
  return cardElement;
}

// Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки

function likeCard(cardLikeButton) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    cardLikeButton.classList.remove("card__like-button_is-active");
  } else {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
}

function getCardTemplate (template, card) {
  return template.querySelector(card).cloneNode(true);
}

function checkLike(cardLikesArr, profileId) {
  return cardLikesArr.some(like => {
    return like._id === profileId
  })
}


export { createCardElement, likeCard, deleteCard };
