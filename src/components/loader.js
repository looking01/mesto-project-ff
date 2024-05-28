function makeLoader (isLoading, button, textMessage, textMessageLoading) {
  if(isLoading) {
    button.textContent = textMessageLoading;
    button.setAttribute("disabled", "true");
  } else {
    button.textContent = textMessage;
    button.setAttribute("disabled", "false");
  }
}

export {makeLoader};