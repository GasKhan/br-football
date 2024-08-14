import { Router } from 'express';
import {
  getTeamsForGameController,
  setTeamController,
} from './teams-controller';

export const router = Router();

router.get('/forGame', getTeamsForGameController);
router.post('/', setTeamController);
