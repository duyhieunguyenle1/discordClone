import Joi from 'joi';

const createServerSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string(),
});

const getServerByCodeSchema = Joi.object({
  inviteCode: Joi.string().regex(/^\d+$/).min(8),
});

export { createServerSchema, getServerByCodeSchema };
