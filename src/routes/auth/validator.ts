import { password } from '../validators';
import validate from '@middlewares/validate';
import Joi from 'joi';

export const validateRegister = validate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
});

export const validateLogin = validate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export const validateLogout = validate({
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
});

export const validateRefreshToken = validate({
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
});

export const validateForgotPassword = validate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});

export const validateResetPassword = validate({
  body: Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
});

export const validateVerifyEmail = validate({
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
});
