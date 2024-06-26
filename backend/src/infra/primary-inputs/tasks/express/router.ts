import { Router } from 'express';

import { createTaskController } from './create.controller';
import { getAllTasksController } from './getAll.controller';
import { updateTaskController } from './update.controller.';
import { removeTaskController } from './remove.controller';

const router = Router();

router.post('/', createTaskController);
router.get('/', getAllTasksController);
router.put('/:id', updateTaskController);
router.delete('/:id', removeTaskController);

export { router as taskRouter };
