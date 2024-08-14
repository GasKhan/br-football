import { Router } from 'express';
import {
  getGameController,
  getGamesController,
  setGameController,
} from './games-controller';

export const router = Router();

router.get('/', getGamesController);
router.get('/:id', getGameController);
router.post('/', setGameController);
