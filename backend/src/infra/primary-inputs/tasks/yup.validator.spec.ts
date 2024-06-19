import { StatusTask } from '@domain/tasks/model';
import {
  createTaskSchema,
  removeTaskSchema,
  TaskYupValidator,
  TaskYupValidatorProps,
} from './yup.validator';

const containerMock = {
  handleValidation: jest.fn(),
};

describe('TaskValidator', () => {
  const {
    validateCreateTaskInput,
    validateUpdateTaskInput,
    validateRemoveTaskInput,
  } = TaskYupValidator(containerMock as unknown as TaskYupValidatorProps);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should validate correct input', () => {
    const validInput = {
      title: 'Test Task',
      description: 'This is a test task description',
    };

    expect(() => validateCreateTaskInput(validInput)).not.toThrow();
  });

  it('should validate correct input', () => {
    const validInput = {
      id: '1',
      title: 'Test Task',
      description: 'This is a test task description',
      status: StatusTask.TODO,
    };

    expect(() => validateUpdateTaskInput(validInput)).not.toThrow();
  });

  it('should throw validation error for invalid input', () => {
    const invalidInput = {
      description: 'This is a test task description without a title',
    };

    validateCreateTaskInput(invalidInput);

    expect(containerMock.handleValidation).toBeCalledWith(
      createTaskSchema,
      invalidInput,
    );
  });

  it('should validate remove task input', () => {
    const invalidInput = {
      id: '1',
    };

    validateRemoveTaskInput(invalidInput);

    expect(containerMock.handleValidation).toBeCalledWith(
      removeTaskSchema,
      invalidInput,
    );
  });
});
