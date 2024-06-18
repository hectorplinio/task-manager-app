import { ValidationError } from '@shared/error';
import { AnyObjectSchema } from 'yup';

export type IHandleValidation<T = unknown> = (
  schema: AnyObjectSchema,
  data: unknown,
) => T;

export const handleValidation: IHandleValidation = async (schema, data) => {
  try {
    return await schema.validate(data);
  } catch (exception) {
    const error = exception as Error;
    throw new ValidationError(error.message);
  }
};

export const HandleValidation = () => {
  return handleValidation;
};
