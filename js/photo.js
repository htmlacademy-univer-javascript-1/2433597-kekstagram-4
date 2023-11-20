import {similarPhotos} from './data.js';

const photoTemplate = document.querySelector('#picture').content;
const createPicture = function(index){
  const newPhoto = photoTemplate.cloneNode(true);
  const photoImg = newPhoto.querySelector('.picture__img');
  const photoLikes = newPhoto.querySelector('.picture__likes');
  const photoComments = newPhoto.querySelector('.picture__comments');
  photoImg.src =index.url;
  photoImg.alt = index.description;
  photoLikes.textContent = index.likes;
  photoComments.textContent = index.comments;

  return newPhoto;
};

const renderPhoto = function (photos) {
  const photosBlock = document.querySelector('.picture');
  photos.forEach((element) => {
    const photo = createPicture(element);
    photosBlock.append(photo);
  });
};
renderPhoto(similarPhotos);