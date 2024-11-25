import { Router } from 'express';
import {
  getAssistsControllerByPlayer,
  getTopAssistsController,
} from './assists.controllers';

export const router = Router();

router.get('/', getAssistsControllerByPlayer);
router.get('/top', getTopAssistsController);
