import { AnyObjectSchema } from 'yup';
import { JSONObject } from './types';

/** @throws { @link ValidationError } */
export type HandleValidation = <T = unknown>(
  schema: AnyObjectSchema,
  data: JSONObject,
) => T;
