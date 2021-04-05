import * as Joi from 'joi';

const signUp = {
  name: Joi
    .string()
    .required(),
  phoneNumber: Joi
    .string()
    .length(13)
    .pattern(/^\+[0-9]+$/)
    .required(),
  password: Joi
    .string()
    .required(),
  role: Joi
    .string()
    .required(),
};

const signIn = {
  phoneNumber: Joi
    .string()
    .length(13)
    .pattern(/^\+[0-9]+$/)
    .required(),
  password: Joi
    .string()
    .required(),
};

const signOut = {
  access: Joi
    .string()
    .required(),
  refresh: Joi
    .string()
    .required(),
};

export const authValidation = {
  signUp,
  signIn,
  signOut,
};
