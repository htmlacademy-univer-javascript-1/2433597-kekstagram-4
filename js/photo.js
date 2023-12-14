import { openBigPicture } from './big-picture.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosBlock = document.querySelector('.pictures');
const createPicture = function(index){
  const newPhoto = photoTemplate.cloneNode(true);
  const photoImg = newPhoto.querySelector('.picture__img');
  const photoLikes = newPhoto.querySelector('.picture__likes');
  const photoComments = newPhoto.querySelector('.picture__comments');
  photoImg.src =index.url;
  photoImg.alt = index.description;
  photoLikes.textContent = index.likes;
  photoComments.textContent = index.comments.length;

  return newPhoto;
};

const renderPhoto = function (photos) {
  photos.forEach((element) => {
    const photo = createPicture(element);
    photo.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(element);
    });
    photosBlock.appendChild(photo);
  });
};
export {renderPhoto};
