export const removeDataStorage = (data) => {
  let checkbox = localStorage.getItem('checkbox');
  if (checkbox === 'true') {
    localStorage.removeItem(data);
  } else {
    sessionStorage.removeItem(data);
  }
};
