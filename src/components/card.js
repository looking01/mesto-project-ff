


import { openPopUp } from "./modal";
import { changeLike } from "./api";

// Функция создания карточки

function createCardElement(templateEle, serverData,  cardData, likeRemoveCallback, imgPopUpCallback, profileId, deleteCardCallback) {
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
      cardData.idDeleteCard = serverData._id;
      cardData.cardForDelete = evt.target.closest(cardData.card);
      deleteCardCallback(cardData.idDeleteCard, cardData.cardForDelete)
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

function likeRemoveCard(evt, buttonActiveLikeClass, cardLikeCounter,serverData, profileId) {
  if (checkLike(serverData.likes, profileId)) {
    changeLike(serverData._id, false).then(card => {
      cardLikeCounter.textContent = card.likes.length;
      evt.target.classList.remove(buttonActiveLikeClass);
      serverData.likes = card.likes;
    }).catch((err) => console.log(err))
  } else {
    changeLike(serverData._id, true).then(card => {
      cardLikeCounter.textContent = card.likes.length;
      evt.target.classList.add(buttonActiveLikeClass);
      serverData.likes = card.likes
    }).catch((err) => console.log(err))
  }
}

//Функция получения шаблона карточки

function getCardTemplate (template, card) {
  return template.querySelector(card).cloneNode(true);
}

// Функция проверки пользователя поставившего лайка

function checkLike(cardLikesArr, profileId) {
  return cardLikesArr.some(like => {
    return like._id === profileId
  })
}


export { createCardElement, likeRemoveCard, deleteCard };
