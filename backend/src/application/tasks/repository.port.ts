import { BaseRepository } from '@application/shared/repository';
import { Task } from '@domain/tasks/model';

export type TaskRepository = BaseRepository<Task>;
