import Joi from 'joi';

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(18).required(),
  email: Joi.string().email().required(),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(18).required(),
  password: Joi.string().min(6).max(18).required(),
  email: Joi.string().email().required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string(),
});

const otpVerifySchema = Joi.object({
  otp: Joi.string().min(6).required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  otpVerifySchema,
  resetPasswordSchema,
  forgotPasswordSchema,
};
