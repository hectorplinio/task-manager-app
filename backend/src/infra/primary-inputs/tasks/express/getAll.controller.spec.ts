import { handleControllerError as handleControllerErrorMock } from '@infra/primary-inputs/shared/handleControllerError';
import { Request, Response } from 'express';

import { mockTask } from '@domain/tasks/mock';
import { getAllTasksController } from './getAll.controller';

jest.mock('@infra/primary-inputs/shared/handleControllerError', () => ({
  handleControllerError: jest.fn(),
}));

const getAllTasksUsecaseMock = jest.fn();

const mockReq = {
  container: {
    cradle: {
      getAllTasksUsecase: getAllTasksUsecaseMock,
    },
  },
} as unknown as Request;

const mockRes = {
  status: jest.fn().mockImplementation(() => mockRes),
  json: jest.fn(),
} as unknown as Response;

const usecaseReponse = mockTask;

describe('Get All Tasks Controller', () => {
  afterEach(() => jest.clearAllMocks());

  it('Check getAllTasksController respond correctly', async () => {
    (
      mockReq.container?.cradle.getAllTasksUsecase as jest.Mock
    ).mockResolvedValue(usecaseReponse);

    await getAllTasksController(mockReq, mockRes);

    expect(mockReq.container?.cradle.getAllTasksUsecase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTask);
  });

  it('Container empty', async () => {
    const requestWithoutContainer = {
      container: null,
    } as unknown as Request;
    await getAllTasksController(requestWithoutContainer, mockRes);
    expect(handleControllerErrorMock).toHaveBeenCalled();
  });
});
