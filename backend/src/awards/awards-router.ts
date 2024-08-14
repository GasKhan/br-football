import { Router } from 'express';
import { getAwardController, setAwardController } from './awards-controller';

export const router = Router();

router.get('/', getAwardController);
router.post('/', setAwardController);
