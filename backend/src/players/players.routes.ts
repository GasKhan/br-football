import { Router } from 'express';
import {
  createPlayerController,
  deletePlayerController,
  getPlayersController,
  getPlayerController,
  editPlayerController,
} from './players.controllers';
export const router = Router();

// router.get('/:nameSmpl', getPlayersController);

router.get('/', getPlayersController);

router.get('/:id', getPlayerController);

router.post('/', createPlayerController);

router.patch('/:id', editPlayerController);

router.delete('/:id', deletePlayerController);
