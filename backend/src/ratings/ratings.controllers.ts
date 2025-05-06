import { Request, Response } from 'express';
import {
  getPlayerRatingsByMonthService,
  getRatingService,
} from './ratings.services';

export const getTopRatings = async (req: Request, res: Response) => {
  try {
    const ratings = await getPlayerRatingsByMonthService();
    res.status(200).json({ ratings });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getRating = async (req: Request, res: Response) => {
  const { playerId } = req.params;
  const { month, year } = req.query;

  try {
    if (!playerId || !month || !year)
      res
        .status(400)
        .send({ message: 'Required info for getting rating wasnt provided' });
    else {
      const playerRating = await getRatingService(+playerId, +month, +year);
      res.status(200).json(playerRating);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};
