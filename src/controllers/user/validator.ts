import { password } from '../validators';
import validate from '@middlewares/validate';
import Joi from 'joi';

export const createUser = validate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      name: Joi.string().required(),
      role: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
});

export const getUsers = validate({
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sort: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
});

export const getUser = validate({
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
});

export const updateUser = validate({
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1)
    .options({ allowUnknown: true }),
});

export const deleteUser = validate({
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
});

export const updateProfile = validate({
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1)
    .options({ allowUnknown: true }),
});
