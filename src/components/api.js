const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '86233cf2-3707-4755-b629-c1fa4bf4348f',
    'Content-Type': 'application/json'
  }
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getUserData = () => {

}

function getData(pathResource, method = "GET") {
  return fetch(config.baseUrl + pathResource, {
    method,
    headers: {authorization: config.headers.authorization}
  }) .then(checkResponse);
}