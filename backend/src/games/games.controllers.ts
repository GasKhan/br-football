import { Request, Response } from 'express';
import {
  getGameDataService,
  getGamesService,
  setGameResultService,
  setGameService,
} from './games.services';
import { GameResult } from '../models';

export const getGamesController = async (req: Request, res: Response) => {
  try {
    const games = await getGamesService();
    res.status(200).json(games);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};

export const getGameByIdController = async (req: Request, res: Response) => {
  const { gameId } = req.params;

  try {
    if (!gameId) res.status(400).send({ message: 'Game id wasnt provided' });
    else {
      const game = await getGameDataService(+gameId);
      res.status(200).json(game);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};
export const getActiveGameController = async (req: Request, res: Response) => {
  try {
    const game = await getGameDataService();
    res.status(200).json(game);
  } catch (err) {
    if (err instanceof Error && err.message === 'Game not found') {
      res.status(404).send({ message: 'No active game found' });
    } else {
      console.log(err);
      res.status(500).send({ message: 'Server error' });
    }
  }
};

export const setGameController = async (req: Request, res: Response) => {
  const { teams } = req.body;
  console.log('teams', teams);
  try {
    if (!teams) res.status(400).send({ message: 'Teams werent provided' });
    else {
      const gameId = await setGameService(teams);
      res.status(201).json(gameId);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};

export const setGameResultsController = async (req: Request, res: Response) => {
  const gameResults: GameResult = req.body;
  try {
    if (!gameResults)
      res.status(400).send({ message: 'Ratings werent provided' });
    else {
      await setGameResultService(gameResults);
      res.status(200).send({ message: 'Ratings were successfully added' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};
