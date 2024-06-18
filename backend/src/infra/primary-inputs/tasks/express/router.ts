import { Router } from 'express';

import { createTaskController } from './create.controller';

const router = Router();

router.post('/', createTaskController);

export { router as taskRouter };
