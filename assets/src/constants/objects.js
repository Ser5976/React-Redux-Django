// массивы для радиокнопок в форме
export const radioStatus = [
  { label: 'Продаётся', value: '1' },
  { label: 'В продаже', value: '2' },
  { label: 'Продан', value: '3' },
];
export const radioType = [
  { label: 'Коттедж', value: '1' },
  { label: 'Многоэтажный дом', value: '2' },
];

// шаблон объекта, для создания объекта с данными из формы и отправки на сервак
export const defaultData = {
  owner: null,
  description: '',
  photo: undefined,
  currency: undefined,
  price: '',
  status: undefined,
  house_type: undefined,
  address: {
    country: '',
    city: '',
    street: '',
    house_number: '',
    zip_code: '',
  },
};
