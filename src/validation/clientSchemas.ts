import * as Joi from 'joi';

const umbrellaRequest = {
  volunteerId: Joi
    .number()
    .required(),
  intention: Joi
    .string()
    .required(),
};

const changeStatus = {
  status: Joi
    .boolean()
    .required(),
};

export const clientValidation = {
  umbrellaRequest,
  changeStatus,
};
