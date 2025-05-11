import { Router } from 'express';
import {
  getActiveGame,
  getGameById,
  getGameDates,
  getGames,
  setGame,
  setGameResults,
} from './games.controllers';

export const router = Router();

router.get('/', getGames);
router.get('/dates', getGameDates);
router.get('/active', getActiveGame);
router.get('/:id', getGameById);

router.post('/', setGame);
router.post('/results', setGameResults);
