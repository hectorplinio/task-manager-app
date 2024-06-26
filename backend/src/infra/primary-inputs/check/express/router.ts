import { Router } from 'express';
import { checkController } from './check.controller';

const router = Router();

router.get('/', checkController);

export { router as checkRouter };
