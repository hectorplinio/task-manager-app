import * as yup from 'yup';
import { ValidationError } from '@shared/error';
import { handleValidation } from '.';

describe('handleValidation', () => {
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
  });

  it('should validate data correctly', async () => {
    const data = {
      title: 'Test Task',
      description: 'This is a test task description',
    };

    await expect(handleValidation(schema, data)).resolves.toEqual(data);
  });

  it('should throw ValidationError for invalid data', async () => {
    const data = {
      description: 'This is a test task description without a title',
    };

    await expect(handleValidation(schema, data)).rejects.toThrow(
      ValidationError,
    );
    await expect(handleValidation(schema, data)).rejects.toThrow(
      'Title is required',
    );
  });
});
