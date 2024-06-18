import express, { Application as ExpressApplication } from 'express';
import { Server } from 'http';
import { checkRouter } from '@infra/primary-inputs/check/express/router';
import { scopePerRequest } from 'awilix-express';
import { container } from '@infra/shared/awilix';
import { taskRouter } from '../tasks/express/router';

export interface ServerApplication {
  app: ExpressApplication;
  close: () => Promise<void>;
  run: () => Server;
}

const createServer = async (
  taskManagerApp: string | number,
): Promise<ServerApplication> => {
  const app = express();
  let server: Server | null = null;
  console.info(`Starting API on ${taskManagerApp}...`);

  // MIDDLEWARES
  app.use(express.json());
  app.use(scopePerRequest(container));

  // ENDPOINTS
  app.use('/check', checkRouter);
  app.use('/tasks', taskRouter);

  const close = (): Promise<void> => {
    return new Promise((resolve) => {
      server?.close(() => {
        console.log('HTTP server closed');
        resolve();
      });
    });
  };

  const run = (): Server => {
    server = app.listen(taskManagerApp, () => {
      console.log(`taskManagerApp listening on ${taskManagerApp}`);
      app.emit('listened');
    });

    process.on('uncaughtException', (error) => {
      console.error('Uncaught error received: ', error);
    });
    return server;
  };

  return { app, run, close };
};

export { createServer };
