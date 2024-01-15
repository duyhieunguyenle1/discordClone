import { StatusCodes } from 'http-status-codes';

class CustomErrorAPI extends Error {
  statusCode: StatusCodes;
  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomErrorAPI;
