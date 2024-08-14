import { Router } from 'express';
import {
  getRatingController,
  setRatingsController,
} from './ratings-controller';

export const router = Router();

router.post('/', setRatingsController);
router.get('/:playerId', getRatingController);
