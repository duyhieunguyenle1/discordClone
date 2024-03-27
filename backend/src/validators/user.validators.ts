import Joi from 'joi';

const getAllFriendsSchema = Joi.object({
  serverId: Joi.string().required(),
});

export { getAllFriendsSchema };
