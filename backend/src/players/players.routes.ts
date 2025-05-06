import { Router } from 'express';
import {
  createPlayer,
  deletePlayer,
  getPlayerById,
  editPlayer,
  getPlayers,
} from './players.controllers';

export const router = Router();

router.get('/', getPlayers);

router.get('/:id', getPlayerById);

router.post('/', createPlayer);

router.patch('/:id', editPlayer);

router.delete('/:id', deletePlayer);
