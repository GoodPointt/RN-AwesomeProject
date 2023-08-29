import * as Yup from 'yup';

export const LOGIN_VALIDATION_SCHEMA_EMAIL = Yup.string()
  .email('Enter a valid email address')
  .required('Email is required');

export const LOGIN_VALIDATION_SCHEMA_PASSWORD = Yup.string()
  .matches(
    /^[a-zA-Z0-9!@#$%^&*()-_=+`~[\]{}|:<>/?]+$/,
    'Password must contain only Latin letters, digits, and other characters.'
  )
  .min(8, 'Password must be at least 8 characters long')
  .required('Password is required');

export const REGISTER_VALIDATION_SCHEMA_LOGIN = Yup.string()
  .matches(
    /^[a-zA-Zа-яА-Я0-9'-\s]+$/,
    'Login may contain only letters, digits, apostrophe, dash, and spaces.'
  )
  .min(2, 'Login must be at least 2 characters long')
  .required('Login is required');
