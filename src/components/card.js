

// Создание карточек

import { openPopUp } from "./modal";
import { changeLike } from "./api";

function createCardElement(templateEle, serverData,  cardData, likeRemoveCallback, imgPopUpCallback, profileId, popUpDeleteCard) {
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
    likeRemoveCallback(evt, cardData.buttonLikeActive, serverData, profileId)
  });

}

// Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки

function likeRemoveCard(evt, buttonActiveLikeClass, serverData, profileId) {
  if (checkLike(serverData.likes, profileId)) {
    changeLike(serverData._id, false).then(card => {
      evt.target.classList.remove(buttonActiveLikeClass);
      serverData.likes = card.likes;
    })
  } else {
    changeLike(serverData._id, true).then(card => {
      evt.target.classList.add(buttonActiveLikeClass);
      serverData.likes = card.likes
    })
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


export { createCardElement, likeRemoveCard, deleteCard };
