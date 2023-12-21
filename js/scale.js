const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadModalElement = document.querySelector('.img-upload');
const minButton = uploadModalElement.querySelector('.scale__control--smaller');
const maxButton = uploadModalElement.querySelector('.scale__control--bigger');
const scaleInput = uploadModalElement.querySelector('.scale__control--value');
const container = uploadModalElement.querySelector('.img-upload__preview img');

function changePicScale (value) {
  container.style.transform = `scale(${value/100})`;
  scaleInput.value = `${value}%`;
}

const onMinClick = () => {
  changePicScale(Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE));
};

const onMaxClick = () => {
  changePicScale(Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE));
};

const resetScale = () => changePicScale(DEFAULT_SCALE);

minButton.addEventListener('click', onMinClick);
maxButton.addEventListener('click', onMaxClick);

export {resetScale};
