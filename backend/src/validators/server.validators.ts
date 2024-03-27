import Joi from 'joi';

const createServerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  img: Joi.string().allow(''),
});

const getServerByCodeSchema = Joi.object({
  inviteCode: Joi.string().regex(/^\d+$/).min(8),
});

export { createServerSchema, getServerByCodeSchema };
