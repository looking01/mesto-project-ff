function openPopUp(popUpElement) {
    popUpElement.classList.add('popup_is-opened');
    popUpElement.addEventListener('keydown', closeByEsc)
}

function closePopUp(popUpElement) {
    popUpElement.classList.remove('popup_is-opened');
    popUpElement.removeEventListener('keydown', closeByEsc)
}

function closeButtonPopUp(evt) {
    closePopUp(evt.target.closest('.popup'));
}



function closeByEsc(evt){
    if(evt.key === 'Escape') {
        closePopUp(document.querySelector('.popup_is-opened'));
    }
} 


export {openPopUp, closePopUp, closeButtonPopUp};