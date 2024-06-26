import { CreateTaskInputParams } from '@application/tasks/usecases/create.port';
import { UpdateTaskInputParams } from '@application/tasks/usecases/update.port';
import { StatusTask } from '@domain/tasks/model';
import { JSONObject } from '@shared/types';
import { HandleValidation } from '@shared/yup';
import { mixed, object, string } from 'yup';

export const createTaskSchema = object({
  title: string().required(),
  description: string().required(),
});

export const updateTaskSchema = object({
  id: string().required(),
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(StatusTask)).required(),
});

export const removeTaskSchema = object({
  id: string().required(),
});

export interface TaskValidator {
  validateCreateTaskInput: (data: JSONObject) => Promise<CreateTaskInputParams>;
  validateUpdateTaskInput: (data: JSONObject) => Promise<UpdateTaskInputParams>;
  validateRemoveTaskInput: (data: JSONObject) => Promise<{ id: string }>;
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

  const validateUpdateTaskInput = async (
    data: JSONObject,
  ): Promise<UpdateTaskInputParams> => {
    return await handleValidation<UpdateTaskInputParams>(
      updateTaskSchema,
      data,
    );
  };

  const validateRemoveTaskInput = async (
    data: JSONObject,
  ): Promise<{ id: string }> => {
    return await handleValidation<{ id: string }>(removeTaskSchema, data);
  };

  return {
    validateCreateTaskInput,
    validateUpdateTaskInput,
    validateRemoveTaskInput,
  };
};
