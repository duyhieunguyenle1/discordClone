import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

import { NextFunction, Request, Response } from 'express';

const Validator = (
  validator: Joi.ObjectSchema,
  useJoiError = true,
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { error, value } = validator.validate(req.body);

    if (error) {
      const customError = {
        status: 'failed',
        msg: 'Invalid request. Please review request and try again.',
        stack: error.stack,
      };

      const joiError = {
        status: 'failed',
        msg: error.message.replace(/['"]/g, ''),
        stack: error.stack,
      };

      return res
        .status(
          useJoiError
            ? StatusCodes.FORBIDDEN
            : StatusCodes.BAD_GATEWAY,
        )
        .json(useJoiError ? joiError : customError);
    }

    req.body = value;
    return next();
  };
};

export default Validator;
