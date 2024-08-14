import { Request, Response } from 'express';
import { getRatingService, setRatingsService } from './ratings-service';
import { RatingObj } from '../models';

export const setRatingsController = async (req: Request, res: Response) => {
  const ratingsArr: RatingObj[] = req.body;
  await setRatingsService(ratingsArr);
  res.status(200);
};

export const getRatingController = async (req: Request, res: Response) => {
  const playerId = req.params['playerId'];
  const { month, year } = req.body;

  const rating = await getRatingService(+playerId, month, year);
  res.status(200).json(rating);
};
