import { Task } from '@domain/tasks/model';
import { model, Schema } from 'mongoose';

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

export const TaskEntity = model<Task>('Task', TaskSchema);
