import { renderPhoto } from './photo.js';
import { showAlert, debounce } from './util.js';
import { getFilteredPhotos, initializeFilters } from './filters.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = async(route, errorMessage, method = Method.GET, body=null) =>
  await fetch (`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => load(Route.GET_DATA, ErrorMessage.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, ErrorMessage.SEND_DATA, Method.POST, body);

const setDataFromServer = () => {
  getData()
    .then((photos) => {
      const debouncedPhotosList = debounce(renderPhoto);
      initializeFilters(photos, debouncedPhotosList);
      renderPhoto(getFilteredPhotos());
    })
    .catch((error) => {
      showAlert(error.message);
    });
};

export {sendData, setDataFromServer};
