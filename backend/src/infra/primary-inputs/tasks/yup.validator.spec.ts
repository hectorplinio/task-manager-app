import {
  createTaskSchema,
  TaskYupValidator,
  TaskYupValidatorProps,
} from './yup.validator';

const containerMock = {
  handleValidation: jest.fn(),
};

describe('TaskValidator', () => {
  const { validateCreateTaskInput } = TaskYupValidator(
    containerMock as unknown as TaskYupValidatorProps,
  );

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
});
