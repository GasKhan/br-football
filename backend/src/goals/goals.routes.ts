import { Router } from 'express';
import {
  getGoalsControllerByPlayer,
  getTopGoalsController,
  setGoalController,
} from './goals.controllers';

export const router = Router();

router.get('/top', getTopGoalsController);
router.get('/', getGoalsControllerByPlayer);

router.post('/', setGoalController);

//TODO: update goal
