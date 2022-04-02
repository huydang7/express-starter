import Joi from 'joi';
import validate from '../../middlewares/validate';
import { password } from '../validators';

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

export const validateRefreshTokens = validate({
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
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
});

export const validateVerifyEmail = validate({
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
});
