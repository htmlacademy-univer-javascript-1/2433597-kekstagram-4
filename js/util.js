const ALERT_SHOW_TIME = 3000; //Время в мс

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position='absolute';
  alert.style.zIndex = '99999';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '28px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = '#91041a';
  alert.textContent = message;
  document.querySelector('body').append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert};
