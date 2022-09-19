import Joi from 'joi';
import { Role } from '../../configs/roles';
import validate from '../../middlewares/validate';
import { password, objectId } from '../validators';

export const createUser = validate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      name: Joi.string().required(),
      role: Joi.string().required().valid(Role.ADMIN, Role.USER),
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
    userId: Joi.string().custom(objectId),
  }),
});

export const updateUser = validate({
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
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
    userId: Joi.string().custom(objectId),
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
