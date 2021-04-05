import * as express from 'express';
import * as Joi from 'joi';
import { BadRequest } from 'http-errors';

export function validatorMiddleware(validationSchema: Joi.SchemaMap): express.RequestHandler {
  return (req, res, next) => {
    if (req.path === '/sign-up') {
      req.body = JSON.parse(req.body.data);
    }

    const bodyValidate = Joi.object(validationSchema).validate(req.body);
    const queryValidate = Joi.object(validationSchema).validate(req.query);

    if (bodyValidate.error && queryValidate.error) {
      throw new BadRequest('Validation Error!');
    }

    return next();
  };
}
