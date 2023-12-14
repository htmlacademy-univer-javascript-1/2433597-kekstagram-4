const COMMENTS_PER_CLICK = 5;
let commentShown = 0;
let comments =[];

const photoElement = document.querySelector('.big-picture');
const commentsCount = photoElement.querySelector('.social__comment-count');
const commentsLoader = photoElement.querySelector('.comments-loader');
const photoCloseElement = photoElement.querySelector('.big-picture__cancel');
const commentsList= photoElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

function createComments ({avatar, name, message}){
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src=avatar;
  comment.querySelector('.social__picture').alt=name;
  comment.querySelector('.social__text').textContent= message;
  return comment;
}

function renderBigPic ({url, likes, description}){
  photoElement.querySelector('.big-picture__img img').src=url;
  photoElement.querySelector('.big-picture__img img').alt=description;
  photoElement.querySelector('.likes-count').textContent=likes;
  photoElement.querySelector('.social__caption').textContent=description;
}

function renderComments () {
  commentShown+=COMMENTS_PER_CLICK;
  if(commentShown>=comments.length){
    commentsLoader.classList.add('hidden');
    commentShown=comments.length;
  }else{
    commentsLoader.classList.remove('hidden');
  }
  const documentFragment=document.createDocumentFragment();
  for(let i=0; i< commentShown; i++){
    const comment = createComments(comments[i]);
    documentFragment.append(comment);
  }
  commentsList.innerHTML='';
  commentsList.appendChild(documentFragment);
  commentsCount.textContent=`${commentShown} из ${comments.length} комментариев`;
}

const onClickLoaderComments = () => renderComments();

const onClickClose = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};
const onDocumentKeydown = (evt) => {
  if(evt.key==='Escape'){
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (data) {
  photoElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  photoCloseElement.addEventListener ('click', onClickClose);
  commentsLoader.addEventListener ('click', onClickLoaderComments);
  renderBigPic(data);
  comments=data.comments;
  if(comments.length>0){
    renderComments();
  }
}

function closeBigPicture () {
  photoElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoCloseElement.removeEventListener ('click', onClickClose);
  commentsLoader.removeEventListener ('click', onClickLoaderComments);
  commentsList.innerHTML='';
  commentShown=0;
}

export {openBigPicture};
