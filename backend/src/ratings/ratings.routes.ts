import { Router } from 'express';
import { getRating, getTopRatings } from './ratings.controllers';

export const router = Router();

router.get('/', getTopRatings);
router.get('/:playerId', getRating);
