const effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [effects.CHROME]:{
    style: 'grayscale',
    unit: '',
  },
  [effects.SEPIA]:{
    style: 'sepia',
    unit: '',
  },
  [effects.MARVIN]:{
    style: 'invert',
    unit: '%',
  },
  [effects.PHOBOS]:{
    style: 'blur',
    unit: 'px',
  },
  [effects.HEAT]:{
    style: 'brightness',
    unit: '',
  },
};

const sliderOptions = {
  [effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effects.HEAT]: {
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

let currentEffect = effects.DEFAULT;

function setPictureStyle () {
  if(currentEffect===effects.DEFAULT){
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
  if(currentEffect!==effects.DEFAULT) {
    createSlider(sliderOptions[currentEffect]);
    showSlider();
  }
};

function setEffect (effect) {
  currentEffect = effect;
  setSlider();
}

function resetEffect () {
  setEffect(effects.DEFAULT);
}

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

function initializeEffect () {
  setSlider();
  effectsElement.addEventListener('change', onEffectChange);
}

export {resetEffect, initializeEffect};
