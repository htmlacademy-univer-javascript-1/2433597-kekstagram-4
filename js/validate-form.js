import { resetScale } from './scale.js';
import { initializeEffect, resetEffect } from './effects.js';

const MAX_HASHTAGS_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const errorMessage = {
  INVALID_COUNT:`Максимум ${MAX_HASHTAGS_COUNT} хэштегов`,
  NOT_UNIQUE:'Хэштеги должны быть уникальными',
  INVALID_PATTERN:'Неправильный хэштег'
};
const submitText = {
  IDLE:'Опубликовать',
  SUBMITTING:'Отправляю на сервер...',
};
const FILE_TYPES  = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('#upload-select-image');
const imageInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');

const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo:'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass:'img-upload__field-wrapper--error',
});

const isErrorMessageActive = () => Boolean(document.querySelector('.error'));

const isTextFocused = () =>
  document.activeElement===hashtagField || document.activeElement===commentField;

const onClickClose = (evt) => {
  evt.preventDefault();
  onCloseForm();
};
const onDocumentKeydown = (evt) => {
  if(evt.key==='Escape' && !isTextFocused() && !isErrorMessageActive()){
    evt.preventDefault();
    onCloseForm();
  }
};

const onImageInput = () => {
  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    photoPreview.src=URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${photoPreview.src})`;
    });
  }

  overlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeButton.addEventListener('click', onClickClose );
  document.addEventListener('keydown', onDocumentKeydown);
};

function onCloseForm () {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  closeButton.removeEventListener('click', onClickClose );
  document.removeEventListener('keydown', onDocumentKeydown);
}

function normalizeTags (tagString) {
  return tagString.trim()
    .split(' ')
    .filter((tag) => Boolean(tag.length));
}

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;
const hasUniqueTags = (value) => {
  const lowerTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerTags.length===new Set(lowerTags).size;
};

const toggleSubmit = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? submitText.SUBMITTING:submitText.IDLE;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errorMessage.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errorMessage.NOT_UNIQUE,
  1,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  errorMessage.INVALID_PATTERN,
  2,
  true
);

function setOnFormSubmit (cb) {
  const onSubmit = async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if(isValid){
      toggleSubmit(true);
      await cb(new FormData(form));
      toggleSubmit();
    }
  };
  form.addEventListener('submit', onSubmit);
}

imageInput.addEventListener('change',onImageInput);

initializeEffect();

export {setOnFormSubmit, onCloseForm};

