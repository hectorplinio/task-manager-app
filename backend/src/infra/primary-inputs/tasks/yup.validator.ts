import { CreateTaskInputParams } from '@application/tasks/usecases/create.port';
import { JSONObject } from '@shared/types';
import { HandleValidation } from '@shared/yup';
import { object, string } from 'yup';

export const createTaskSchema = object({
  title: string().required(),
  description: string().required(),
});

export interface TaskValidator {
  validateCreateTaskInput: (data: JSONObject) => Promise<CreateTaskInputParams>;
}

export interface TaskYupValidatorProps {
  handleValidation: HandleValidation;
}

export const TaskYupValidator = ({
  handleValidation,
}: TaskYupValidatorProps): TaskValidator => {
  const validateCreateTaskInput = async (
    data: JSONObject,
  ): Promise<CreateTaskInputParams> => {
    return await handleValidation<CreateTaskInputParams>(
      createTaskSchema,
      data,
    );
  };

  return {
    validateCreateTaskInput,
  };
};
