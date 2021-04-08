import * as Joi from 'joi';

const umbrellaRequest = {
  volunteerId: Joi
    .number()
    .required(),
  intention: Joi
    .string()
    .required(),
};

export const clientValidation = {
  umbrellaRequest,
};
