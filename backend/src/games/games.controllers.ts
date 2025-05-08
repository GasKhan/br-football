import { NextFunction, Request, Response } from 'express';
import {
  checkIsActiveGameService,
  getGameService,
  getGamesService,
  setGameResultService,
  setGameService,
} from './games.services';
import { BadRequestError } from '../shared/errors/badRequestError';

export const getGamesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const games = await getGamesService();
    res.status(200).json(games);
  } catch (err) {
    next(err);
  }
};

export const getGameByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    if (!id) next(new BadRequestError({ message: 'Game id wasnt provided' }));
    else {
      const game = await getGameService(+id);
      res.status(200).json(game);
    }
  } catch (err) {
    next(err);
  }
};

export const getActiveGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await getGameService();
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

export const setGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { teams } = req.body;
  try {
    const isThereActiveGame = await checkIsActiveGameService();
    if (isThereActiveGame) {
      return next(
        new BadRequestError({ message: 'There is already active game' })
      );
    }
    if (!teams) {
      return next(new BadRequestError({ message: 'Teams werent provided' }));
    }

    const gameId = await setGameService(teams);
    res.status(201).json(gameId);
  } catch (err) {
    next(err);
  }
};

export const setGameResultsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameResults } = req.body;

  try {
    if (!gameResults)
      next(new BadRequestError({ message: 'Game results wasnt provided' }));
    else {
      const gameId = await setGameResultService(gameResults);
      res
        .status(200)
        .json({ message: 'Results for game were added successfully' });
    }
  } catch (err) {
    next(err);
  }
};
