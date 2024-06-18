import { handleControllerError } from './handleControllerError';
import { ValidationError, ApplicationError } from '@shared/error';
import { Response } from 'express';

describe('handleControllerError', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('should handle ValidationError', () => {
    const error = new ValidationError('Validation failed');
    handleControllerError(error, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 'ValidationError',
      message: 'Validation failed',
      errors: expect.any(String),
    });
  });

  it('should handle ApplicationError', () => {
    const error = new ApplicationError('Application error');
    handleControllerError(error, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 'ApplicationError',
      message: 'Application error',
      errors: expect.any(String),
    });
  });

  it('should handle unknown error', () => {
    const error = new Error('Unknown error');
    handleControllerError(error, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
  });
});
