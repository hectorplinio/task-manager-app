import { handleControllerError as handleControllerErrorMock } from '@infra/primary-inputs/shared/handleControllerError';
import { Request, Response } from 'express';

import { mockTask } from '@domain/tasks/mock';
import { updateTaskController } from './update.controller.';
import { StatusTask } from '@domain/tasks/model';

jest.mock('@infra/primary-inputs/shared/handleControllerError', () => ({
  handleControllerError: jest.fn(),
}));

const updateTaskUsecaseMock = jest.fn();

const taskValidatorMock = { validateUpdateTaskInput: jest.fn() };

const mockReq = {
  container: {
    cradle: {
      updateTaskUsecase: updateTaskUsecaseMock,
      taskValidator: taskValidatorMock,
    },
  },
  body: {
    id: '1',
    title: 'Test Task',
    description: 'This is a test task description',
    status: StatusTask.TODO,
  },
} as unknown as Request;

const mockRes = {
  status: jest.fn().mockImplementation(() => mockRes),
  json: jest.fn(),
} as unknown as Response;

const usecaseReponse = mockTask;

describe('Update Task Controller', () => {
  afterEach(() => jest.clearAllMocks());

  it('Check updateTaskController respond correctly', async () => {
    (
      mockReq.container?.cradle.updateTaskUsecase as jest.Mock
    ).mockResolvedValue(usecaseReponse);

    await updateTaskController(mockReq, mockRes);

    expect(
      mockReq.container?.cradle.taskValidator.validateUpdateTaskInput,
    ).toHaveBeenCalledWith(mockReq.body);
    expect(mockReq.container?.cradle.updateTaskUsecase).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTask);
  });

  it('Container empty', async () => {
    const requestWithoutContainer = {
      container: null,
    } as unknown as Request;
    await updateTaskController(requestWithoutContainer, mockRes);
    expect(handleControllerErrorMock).toHaveBeenCalled();
  });
});
