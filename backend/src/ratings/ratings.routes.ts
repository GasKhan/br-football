import { Router } from 'express';
import {
  getRatingController,
  getTopRatings,
  getWinsInfo,
} from './ratings.controllers';

export const router = Router();

router.get('/', getTopRatings);
router.get('/:playerId', getRatingController);
router.get('/wins/:playerId', getWinsInfo);
