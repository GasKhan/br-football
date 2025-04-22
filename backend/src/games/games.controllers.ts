import { Request, Response } from 'express';
import {
  checkIsActiveGameService,
  getGameDataService,
  getGamesService,
  setGameResultService,
  setGameService,
} from './games.services';
//TODO: Add next call in every controller instead of res.send in catch blocks
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
  const { id } = req.params;

  try {
    if (!id) res.status(400).send({ message: 'Game id wasnt provided' });
    else {
      const game = await getGameDataService(+id);
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
    const isThereActiveGame = await checkIsActiveGameService();
    if (isThereActiveGame) {
      res.status(400).send({ message: 'There is already active game' });
      return;
    }
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
  console.log(req.body);
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
