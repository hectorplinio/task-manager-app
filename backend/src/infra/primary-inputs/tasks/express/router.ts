import { Router } from 'express';

import { createTaskController } from './create.controller';
import { getAllTasksController } from './getAll.controller';

const router = Router();

router.post('/', createTaskController);
router.get('/', getAllTasksController);

export { router as taskRouter };
