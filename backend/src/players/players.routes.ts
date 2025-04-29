import { Router } from 'express';
import {
  createPlayerController,
  deletePlayerController,
  getPlayersController,
  getPlayerController,
  editPlayerController,
  getPlayersByNameController,
} from './players.controllers';
export const router = Router();

router.get('/:nameSmpl', getPlayersByNameController);

router.get('/', getPlayersController);

router.get('/:id', getPlayerController);

router.post('/', createPlayerController);

router.patch('/:id', editPlayerController);

router.delete('/:id', deletePlayerController);
