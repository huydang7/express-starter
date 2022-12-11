import Joi from 'joi';
import validate from 'middlewares/validate';

export const createSample = validate({
  body: Joi.object().keys({}).options({ allowUnknown: true }),
});

export const getSamples = validate({
  query: Joi.object()
    .keys({
      size: Joi.number().integer(),
      page: Joi.number().integer(),
    })
    .options({ allowUnknown: true }),
});

export const getSample = validate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
});

export const updateSample = validate({
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys().options({ allowUnknown: true }),
});

export const deleteSample = validate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
});
