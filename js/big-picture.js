function render (element){
  const photoElement = document.querySelector('.big-picture');
  const photoCloseElement = photoElement.querySelector('.big-picture__cancel');
  const miniPhotoCont = document.querySelector('.pictures');
  const miniPhotos = miniPhotoCont.querySelectorAll('.picture');
  const bigPic = photoElement.querySelector('img');
  const bigPicLikes = photoElement.querySelector('.likes-count');
  const bigPicComments = photoElement.querySelector('.comments-count');
  const bigPicDesc = photoElement.querySelector('.social__caption');
  const commentsList= photoElement.querySelector('.social__comments');

  function onClickClose (evt) {
    evt.preventDefault();
    closePhoto();
  }

  function onKeydown (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePhoto();
    }
  }

  function openPhoto () {
    photoElement.classList.remove('hidden');
    document.querySelector('body').classList.add('.modal-open');
    document.addEventListener('keydown', onKeydown);
    photoCloseElement.addEventListener('click', onClickClose);
  }

  function closePhoto () {
    photoElement.classList.add('hidden');
    document.querySelector('body').classList.remove('.modal-open');
    commentsList.innerHTML='';
    document.removeEventListener('keydown', onKeydown);
    photoCloseElement.removeEventListener('click', onClickClose);
  }

  for (let i=0; i<miniPhotos.length;i++){
    miniPhotos[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      const photo = miniPhotos[i].querySelector('.picture__img');
      const photoLikes = miniPhotos[i].querySelector('.picture__likes');
      const photoComments = miniPhotos[i].querySelector('.picture__comments');
      openPhoto();
      bigPic.src=photo.src;
      bigPic.alt=photo.alt;
      bigPicLikes.textContent=photoLikes.textContent;
      bigPicComments.textContent=photoComments.textContent;
      for(let j=0; j<element[i].comments.length;j++){
        const newComment = document.createElement('li');
        newComment.classList.add('social__comment');
        const avatarComment = document.createElement('img');
        avatarComment.classList.add('social__picture');
        avatarComment.src=element[i].comments[j].avatar;
        avatarComment.alt=element[i].comments[j].name;
        avatarComment.width='35';
        avatarComment.height='35';
        const message =document.createElement('p');
        message.classList.add('social__text');
        message.textContent=element[i].comments[j].message;

        newComment.appendChild(avatarComment);
        newComment.appendChild(message);
        commentsList.appendChild(newComment);
      }
      bigPicDesc.textContent=photo.alt;
    });
  }
}

export {render};
