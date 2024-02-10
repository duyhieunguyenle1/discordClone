import Joi from 'joi';

const sendFriendInvitationSchema = Joi.object({
  email: Joi.string().email().required(),
});

const decideFriendInvitationSchema = Joi.object({
  id: Joi.string().required(),
});

export { sendFriendInvitationSchema, decideFriendInvitationSchema };
