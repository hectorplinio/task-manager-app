import { Response } from 'express';
import {
  ApplicationError,
  ValidationError,
  EntityNotFoundError,
} from '@shared/error';

import { TaskManagerError } from '@shared/error';

const HTTP_STATUS_CODE_BY_ERROR = [
  {
    type: EntityNotFoundError,
    statusCode: 404,
  },
  {
    type: ApplicationError,
    statusCode: 400,
  },
  {
    type: ValidationError,
    statusCode: 400,
  },
];

export const handleControllerError = (err: Error, res: Response): unknown => {
  try {
    if (
      err.name === 'ValidationError' ||
      err.name === 'ApplicationError' ||
      err.name === 'EntityNotFoundError' ||
      err instanceof TaskManagerError
    ) {
      const error = err as TaskManagerError;

      console.warn(error);

      const statusCode = getHttpStatusCodeByError(error);
      const errorResponse = getErrorResponse(error);

      return res.status(statusCode).send(errorResponse);
    }

    console.error(err);

    return res.status(500).send();
  } catch (error) {
    console.error(error as Error);

    return res.status(500).send();
  }
};

const getHttpStatusCodeByError = (error: Error) => {
  const httpStatus = HTTP_STATUS_CODE_BY_ERROR.find(
    ({ type }) => error instanceof type,
  );

  if (!httpStatus) {
    return 500;
  }

  return httpStatus.statusCode;
};

const getErrorResponse = (error: Error) => {
  return { code: error.name, message: error.message, errors: error.stack };
};
