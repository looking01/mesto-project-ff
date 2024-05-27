

// Создание карточек

import { openPopUp } from "./modal";
import { changeLike } from "./api";

function createCardElement(templateEle, serverData,  cardData, likeRemoveCallback, imgPopUpCallback, profileId, popUpDeleteCard) {
  const cardElement = getCardTemplate(templateEle, cardData.card);
  const cardTitle = cardElement.querySelector(cardData.title);
  const cardImage = cardElement.querySelector(cardData.image);
  const cardLikeCounter = cardElement.querySelector(cardData.likeCounter);
  const deleteButton = cardElement.querySelector(cardData.buttonDelete);
  const buttonLike = cardElement.querySelector(cardData.buttonLike);

  cardImage.src = serverData.link;
  cardImage.alt = serverData.name;
  cardTitle.textContent = serverData.name;
  cardLikeCounter.textContent = serverData.likes.length;

  cardImage.addEventListener('click', imgPopUpCallback);
  
  if (checkLike(serverData.likes, profileId)) {
    buttonLike.classList.add(cardData.buttonLikeActive)
  }

  if (serverData.owner._id === profileId) {
    deleteButton.addEventListener('click', (evt) => {
      openPopUp(popUpDeleteCard);
      cardData.idDeleteCard = serverData._id;
      cardData.cardForDelete = evt.target.closest(cardData.card);
    })
  } else {
    deleteButton.remove();
  }

  buttonLike.addEventListener("click", (evt) => {
    likeRemoveCallback(evt, cardData.buttonLikeActive, cardLikeCounter, serverData, profileId)
  });
  return cardElement;
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
