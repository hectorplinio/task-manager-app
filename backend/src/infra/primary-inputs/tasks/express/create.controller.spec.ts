import { handleControllerError as handleControllerErrorMock } from '@infra/primary-inputs/shared/handleControllerError';
import { Request, Response } from 'express';

import { createTaskController } from './create.controller';
import { mockTask } from '@domain/tasks/mock';

jest.mock('@infra/primary-inputs/shared/handleControllerError', () => ({
  handleControllerError: jest.fn(),
}));

const createTaskUsecaseMock = jest.fn();

const taskValidatorMock = { validateCreateTaskInput: jest.fn() };

const mockReq = {
  container: {
    cradle: {
      createTaskUsecase: createTaskUsecaseMock,
      taskValidator: taskValidatorMock,
    },
  },
  body: { title: 'Test Task', description: 'This is a test task description' },
} as unknown as Request;

const mockRes = {
  status: jest.fn().mockImplementation(() => mockRes),
  json: jest.fn(),
} as unknown as Response;

const usecaseReponse = mockTask;

describe('Get Tasks Controller', () => {
  afterEach(() => jest.clearAllMocks());

  it('Check createTaskController respond correctly', async () => {
    (
      mockReq.container?.cradle.createTaskUsecase as jest.Mock
    ).mockResolvedValue(usecaseReponse);

    await createTaskController(mockReq, mockRes);

    expect(
      mockReq.container?.cradle.taskValidator.validateCreateTaskInput,
    ).toHaveBeenCalledWith(mockReq.body);
    expect(mockReq.container?.cradle.createTaskUsecase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockTask);
  });

  it('Container empty', async () => {
    const requestWithoutContainer = {
      container: null,
    } as unknown as Request;
    await createTaskController(requestWithoutContainer, mockRes);
    expect(handleControllerErrorMock).toHaveBeenCalled();
  });
});
