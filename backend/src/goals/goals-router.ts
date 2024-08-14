import { Router } from 'express';
import { getGoalsController, setGoalController } from './goals-controller';

export const router = Router();

router.post('/', setGoalController);
router.get('/:playerId', getGoalsController);
