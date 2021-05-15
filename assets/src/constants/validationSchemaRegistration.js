import * as yup from 'yup';

export const schema = yup.object().shape({
  role: yup.string().nullable().required(),
  username: yup.string().required('Пожалуйста введите имя пользователя'),
  email: yup
    .string()
    .required('Пожалуйста введите адрес электронной почты')
    .email('Некорректно набран email'),
  password1: yup.string().min(8, 'В пароле недостаточно символов'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Неверный пароль')
    .required('Пожалуйста повторите пароль'),
});
