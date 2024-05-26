const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '86233cf2-3707-4755-b629-c1fa4bf4348f',
    'Content-Type': 'application/json'
  }
};

const pathData = {
  profile: '/users/me',
  cards: '/cards',
  likes: '/cards/likes',
  avatar: '/users/me/avatar'
}


const getUserData = () => {
  return getData(pathData.profile)
}

const getCards = () => {
  return getData(pathData.cards)
}



function getData(pathResource, method = "GET") {
  return fetch(config.baseUrl + pathResource, {
    method,
    headers: {authorization: config.headers.authorization}
  }) .then(checkResponse);
}

function postData(pathResource, data, method = "POST") {
  return fetch(config.baseUrl + pathResource, {
    method,
    headers: config.headers,
    body: JSON.stringify(data)
  }).then(checkResponse)
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export{getUserData, getCards}