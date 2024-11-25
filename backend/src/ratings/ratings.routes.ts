import { Router } from 'express';
import {
  getRatingController,
  setRatingsController,
} from './ratings.controllers';

export const router = Router();

router.get('/');
router.get('/:playerId', getRatingController);
router.get('/wins/:playerId');

router.post('/', setRatingsController);
