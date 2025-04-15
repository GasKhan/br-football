import { Router } from 'express';
import {
  getActiveGameController,
  getGameByIdController,
  getGamesController,
  setGameController,
  setGameResultsController,
} from './games.controllers';

export const router = Router();

router.get('/', getGamesController);
router.get('/active', getActiveGameController);
router.get('/:gameId', getGameByIdController);

router.post('/', setGameController);
router.post('/results', setGameResultsController);
