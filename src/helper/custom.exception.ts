import { HttpException } from '@nestjs/common';

interface errorObject {
  statusCode: number;
  message: [string];
  error: string;
}

export class CustomException extends HttpException {
  constructor(objectOrError: errorObject, status: number) {
    super(objectOrError, status);
  }
}
