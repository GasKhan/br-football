import { Router } from 'express';
import {
  createPlayerController,
  deletePlayerController,
  getPlayerController,
  getPlayersController,
  updatePlayerController,
} from './players-controller';
export const router = Router();

router.get('/', getPlayersController);

router.get('/:id', getPlayerController);

router.post('/:id', createPlayerController);

router.put('/:id', updatePlayerController);

router.delete('/:id', deletePlayerController);
