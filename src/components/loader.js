function makeLoader (isLoading, button) {
  if(isLoading) {
    const textMessageLoading = 'Сохранение...';
    button.textContent = textMessageLoading;
    button.disabled = true;
  } else {
    const textMessage = 'Сохранить';
    button.textContent = textMessage;
    button.disabled = false;
  }
}

export {makeLoader};