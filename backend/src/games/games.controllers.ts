import { Request, Response } from 'express';
import {
  getGameDataService,
  getGameService,
  getGamesService,
  setGameResultService,
  setGameService,
} from './games.services';

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

export const setGameController = async (req: Request, res: Response) => {
  const { teams } = req.body;
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
  const { gameResults } = req.body;
  try {
    if (!gameResults)
      res.status(401).send({ message: 'Game results wasnt provided' });
    else {
      const gameId = await setGameResultService(gameResults);
      res
        .status(200)
        .json({ message: 'Results for game were added successfully' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};
