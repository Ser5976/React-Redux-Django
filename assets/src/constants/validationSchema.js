import * as yup from 'yup';

//схема валидации
export const schema = yup.object().shape({
  description: yup.string().required('Обязательно поле для заполнения*'),
  price: yup.string().required('Обязательно поле для заполнения*'),
  status: yup.string().nullable().required('Выберите статус*'),
  house_type: yup.string().nullable().required('Выберите тип*'),
  city: yup.string().required('Обязательно поле для заполнения*'),
  country: yup.string().required('Обязательно поле для заполнения*'),
  street: yup.string().required('Обязательно поле для заполнения*'),
  house_number: yup.string().required('Обязательно поле для заполнения*'),
});
