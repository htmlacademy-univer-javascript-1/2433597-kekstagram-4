import './scale.js';
import { sendData, setDataFromServer } from './api.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { setOnFormSubmit, onCloseForm } from './validate-form.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    onCloseForm();
    showSuccessMessage();
  } catch(error) {
    showErrorMessage(error.message);
  }
});

setDataFromServer();

