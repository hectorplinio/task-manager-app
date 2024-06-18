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

export interface TaskValidator {
  validateCreateTaskInput: (data: JSONObject) => CreateTaskInputParams;
  validateUpdateTaskInput: (data: JSONObject) => UpdateTaskInputParams;
}

export interface TaskYupValidatorProps {
  handleValidation: HandleValidation;
}

export const TaskYupValidator = ({
  handleValidation,
}: TaskYupValidatorProps): TaskValidator => {
  const validateCreateTaskInput = (data: JSONObject): CreateTaskInputParams => {
    return handleValidation<CreateTaskInputParams>(createTaskSchema, data);
  };

  const validateUpdateTaskInput = (data: JSONObject): UpdateTaskInputParams => {
    return handleValidation<UpdateTaskInputParams>(updateTaskSchema, data);
  };

  return {
    validateCreateTaskInput,
    validateUpdateTaskInput,
  };
};
