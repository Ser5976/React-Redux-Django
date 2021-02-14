export const receiveDataStorage = (data) => {
  const checkbox = localStorage.getItem('checkbox');
  let value;
  if (checkbox === 'true') {
    value = localStorage.getItem(data);
  } else {
    value = sessionStorage.getItem(data);
  }
  return value;
};
