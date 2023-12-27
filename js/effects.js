const Effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effects.CHROME]:{
    style: 'grayscale',
    unit: '',
  },
  [Effects.SEPIA]:{
    style: 'sepia',
    unit: '',
  },
  [Effects.MARVIN]:{
    style: 'invert',
    unit: '%',
  },
  [Effects.PHOBOS]:{
    style: 'blur',
    unit: 'px',
  },
  [Effects.HEAT]:{
    style: 'brightness',
    unit: '',
  },
};

const sliderOptions = {
  [Effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effects.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modal = document.querySelector('.img-upload');
const image = modal.querySelector('.img-upload__preview img');
const effectsElement = modal.querySelector('.effects');
const sliderElement = modal.querySelector('.effect-level__slider');
const sliderContainer = modal.querySelector('.img-upload__effect-level');
const effectLevelElement = modal.querySelector('.effect-level__value');

let currentEffect = Effects.DEFAULT;

function setPictureStyle () {
  if(currentEffect===Effects.DEFAULT){
    image.style.filter = null;
    return;
  }
  const {value} = effectLevelElement;
  const {style, unit} = effectToFilter[currentEffect];
  image.style.filter = `${style}(${value}${unit})`;
}

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setPictureStyle();
};

function createSlider ({min, max, step}) {
  noUiSlider.create(sliderElement, {
    range:{min, max},
    step,
    start:max,
    connect:'lower',
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
}

const showSlider = () => {sliderContainer.classList.remove('hidden');};
const hideSlider = () => {sliderContainer.classList.add('hidden');};
const destroySlider = () => {
  if(sliderElement.noUiSlider){
    sliderElement.noUiSlider.destroy();
  }
  setPictureStyle();
};
const setSlider = () => {
  destroySlider();
  hideSlider();
  if(currentEffect!==Effects.DEFAULT) {
    createSlider(sliderOptions[currentEffect]);
    showSlider();
  }
};

function setEffect (effect) {
  currentEffect = effect;
  setSlider();
}

function resetEffect () {
  setEffect(Effects.DEFAULT);
}

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

function initializeEffect () {
  setSlider();
  effectsElement.addEventListener('change', onEffectChange);
}

export {resetEffect, initializeEffect};
