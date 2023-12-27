const PICTURES_PER_FILTER = 10;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');
let currentFilter = Filters.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length-firstPicture.comments.length;

const getFilteredPhotos = () => {
  switch(currentFilter){
    case Filters.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_PER_FILTER);
    case Filters.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

function setOnFilterClick (cb) {
  const onFilterButtonClick = (evt) => {
    if(!evt.target.classList.contains('img-filters__button')){
      return;
    }
    if(evt.target.id===currentFilter){
      return;
    }
    const filterButton = evt.target;
    const activeButton = filtersElement.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    filterButton.classList.add('img-filters__button--active');
    currentFilter = filterButton.id;
    cb(getFilteredPhotos());
  };
  filtersElement.addEventListener('click', onFilterButtonClick);
}

function initializeFilters (loadedPhotos, cb) {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPhotos];
  setOnFilterClick(cb);
}

export {initializeFilters, getFilteredPhotos};
