function makeLoader (isLoading, button, textMessage = 'Сохранить', textMessageLoading = 'Сохранение...') {
  if(isLoading === false) {
    button.textContent = textMessageLoading;
    button.disabled = true;
  } else {
    button.textContent = textMessage;
    button.disabled = false;
  }
}

export {makeLoader};