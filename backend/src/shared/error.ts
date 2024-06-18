export class TaskManagerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TaskManagerError';
  }
}

export class ValidationError extends TaskManagerError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ApplicationError extends TaskManagerError {
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class EntityNotFoundError extends TaskManagerError {
  constructor(message: string) {
    super(message);
    this.name = 'EntityNotFoundError';
  }
}
