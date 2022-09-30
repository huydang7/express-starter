import Joi from 'joi';

export const password: Joi.CustomValidator<any> = (value) => {
  if (value.length < 8) {
    throw new Error('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    throw new Error('password must contain at least 1 letter and 1 number');
  }
  return value;
};
