import { BadRequest } from '@exceptions';
import pick from '@shared/utils/pick';
import Joi from 'joi';

const validate = (schema: any) => (req: any, res: any, next: any) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new BadRequest(errorMessage, 400, error.details));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
