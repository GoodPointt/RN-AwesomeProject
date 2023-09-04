import * as Yup from 'yup';

export const LOGIN_VALIDATION_SCHEMA_EMAIL = Yup.string()
  .email('Enter a valid email address')
  .matches(
    /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
    'Enter a valid email address'
  )
  .required('Email is required');

export const LOGIN_VALIDATION_SCHEMA_PASSWORD = Yup.string()
  .matches(
    /^[a-zA-Z0-9!@#$%^&*()-_=+`~[\]{}|:<>/?]+$/,
    'Password must contain only Latin letters.'
  )
  .min(8, 'Password must be at least 8 characters long')
  .required('Password is required');

export const REGISTER_VALIDATION_SCHEMA_LOGIN = Yup.string()
  .matches(
    /^[a-zA-Zа-яА-Я0-9'-\s]+$/,
    'Login may contain only letters, apostrophe, dash, and spaces.'
  )
  .min(2, 'Login must be at least 2 characters long')
  .required('Login is required');
