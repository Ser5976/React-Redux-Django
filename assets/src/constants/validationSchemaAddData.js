import * as yup from 'yup';

//схема валидации
export const schema = yup.object().shape({
  description: yup.string().required('Обязательно поле для заполнения*'),
  price: yup.string().required('Обязательно поле для заполнения*'),
  status: yup.string().nullable().required(),
  house_type: yup.string().nullable().required(),
  city: yup.string().required('Обязательно поле для заполнения*'),
  country: yup.string().required('Обязательно поле для заполнения*'),
  street: yup.string().required('Обязательно поле для заполнения*'),
  house_number: yup.string().required('Обязательно поле для заполнения*'),
});
