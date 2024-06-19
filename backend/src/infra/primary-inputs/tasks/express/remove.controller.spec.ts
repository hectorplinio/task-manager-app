import { handleControllerError as handleControllerErrorMock } from '@infra/primary-inputs/shared/handleControllerError';
import { Request, Response } from 'express';

import { removeTaskController } from './remove.controller';

jest.mock('@infra/primary-inputs/shared/handleControllerError', () => ({
  handleControllerError: jest.fn(),
}));

const removeTaskUsecaseMock = jest.fn();

const mockReq = {
  container: {
    cradle: {
      removeTaskUsecase: removeTaskUsecaseMock,
    },
  },
  params: '1',
} as unknown as Request;

const mockRes = {
  status: jest.fn().mockImplementation(() => mockRes),
  send: jest.fn(),
} as unknown as Response;

describe('Remove Tasks Controller', () => {
  afterEach(() => jest.clearAllMocks());

  it('Check removeTaskController respond correctly', async () => {
    (
      mockReq.container?.cradle.removeTaskUsecase as jest.Mock
    ).mockResolvedValue(undefined);

    await removeTaskController(mockReq, mockRes);

    expect(mockReq.container?.cradle.removeTaskUsecase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith();
  });

  it('Container empty', async () => {
    const requestWithoutContainer = {
      container: null,
    } as unknown as Request;
    await removeTaskController(requestWithoutContainer, mockRes);
    expect(handleControllerErrorMock).toHaveBeenCalled();
  });
});
