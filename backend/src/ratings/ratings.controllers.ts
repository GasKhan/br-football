import { NextFunction, Request, Response } from 'express';
import {
  getPlayerRatingsByMonthService,
  getRatingService,
} from './ratings.services';
import { BadRequestError } from '../shared/errors/badRequestError';

export const getTopRatings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ratings = await getPlayerRatingsByMonthService();
    res.status(200).json({ ratings });
  } catch (err) {
    next(err);
  }
};

export const getRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { playerId } = req.params;
  const { month, year } = req.query;

  try {
    if (!playerId || !month || !year)
      next(
        new BadRequestError({
          message: 'Required info for getting rating wasnt provided',
        })
      );
    else {
      const playerRating = await getRatingService(+playerId, +month, +year);
      res.status(200).json(playerRating);
    }
  } catch (err) {
    next(err);
  }
};
