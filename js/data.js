import {getRandomInteger,createUniqueIdFromRandomInteger} from './util.js';

const DESCRIPTION=[
  'Сегодня был прекрасный день!',
  'Сходила на прогулку с друзьями',
  'Мама сказала, что я пион!',
  'Это я на концерте, сейчас дома'
];
const MESSAGE=[
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAME =[
  'Артем',
  'Вня',
  'Саша',
  'Андрей',
  'Мария',
  'Никита',
  'Настя'
];


const createUniqueId = createUniqueIdFromRandomInteger (1,25);
const createUniqueUrl = createUniqueIdFromRandomInteger(1,25);
const createUniqueComments = createUniqueIdFromRandomInteger(1,1000);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComments = () =>({
  id:createUniqueComments(),
  avatar:`img/avatar-${getRandomInteger(1,6)}.svg`,
  message:getRandomArrayElement(MESSAGE),
  name:getRandomArrayElement(NAME),
});

const similarComments = Array.from({length: 30}, createComments);

const createPhoto =() => ({
  id:createUniqueId(),
  url:`photos/${createUniqueUrl()}.jpg`,
  description:getRandomArrayElement(DESCRIPTION),
  likes:getRandomInteger(15,200),
  comments:similarComments
});

const similarPhotos = () => Array.from({length: 25}, createPhoto);
export {similarPhotos};

