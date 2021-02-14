export const setDataStorage = (key, data) => {
  // место хранение токена выбирается от значения "Запомнить меня"
  let checkbox = localStorage.getItem('checkbox');
  if (checkbox === 'true') {
    localStorage.setItem(key, data);
  } else {
    sessionStorage.setItem(key, data);
  }
};
