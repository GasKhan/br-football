import { Router } from 'express';
import {
  getGameByIdController,
  getGamesController,
  setGameController,
  setGameResultsController,
} from './games.controllers';

export const router = Router();

router.get('/', getGamesController);
router.get('/:gameId', getGameByIdController);

router.post('/', setGameController);
router.post('/results', setGameResultsController);
