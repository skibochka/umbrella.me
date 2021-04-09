import * as Joi from 'joi';

const umbrellaRequest = {
  volunteerId: Joi
    .number()
    .required(),
  intention: Joi
    .string()
    .valid('lend', 'escort')
    .required(),
};

const changeStatus = {
  status: Joi
    .boolean()
    .required(),
};

const changeRole = {
  role: Joi
    .string()
    .valid('volunteer', 'seeker', 'stationaryVolunteer')
    .required(),
};

const acceptRequest = {
  requestId: Joi
    .number()
    .required(),
};

export const clientValidation = {
  umbrellaRequest,
  changeStatus,
  changeRole,
  acceptRequest,
};
