import { Request, Response } from 'express';
import {
  getRatingService,
  getRatingsService,
  getWinsInfoByPlayerId,
} from './ratings.services';

export const getTopRatings = async (req: Request, res: Response) => {
  try {
    const ratings = await getRatingsService();
    res.status(200).json({ ratings });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const getRatingController = async (req: Request, res: Response) => {
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

export const getWinsInfo = async (req: Request, res: Response) => {
  const { playerId } = req.params;

  try {
    if (!playerId)
      res
        .status(400)
        .send({ message: 'Player id for getting rating wasnt provided' });
    else {
      const winsInfo = await getWinsInfoByPlayerId(+playerId);
      res.status(200).json(winsInfo);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};
