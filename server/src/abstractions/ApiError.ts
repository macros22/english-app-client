
import {
  StatusCodes,
} from 'http-status-codes';

export interface IError {
  status: number;
  fields: {
      name: {
          message: string;
      };
  };
  message: string;
  name: string;
}

class ApiError extends Error implements IError {
  public status = StatusCodes.INTERNAL_SERVER_ERROR as number;

  public success = false;

  public fields: { name: { message: string } };

  constructor(msg: string, statusCode: number, name: string = 'ApiError') {
    super();
    this.message = msg;
    this.status = statusCode;
    this.name = name;
  }
}

export default ApiError;
