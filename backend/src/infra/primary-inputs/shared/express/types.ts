/* eslint-disable @typescript-eslint/no-namespace */

import { AwilixContainer } from 'awilix';

declare global {
  namespace Express {
    interface Request {
      container: AwilixContainer;
    }
  }
}
