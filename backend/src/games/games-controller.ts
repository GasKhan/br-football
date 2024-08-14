import { Request, Response } from 'express';
import {
  getGameService,
  getGamesService,
  setGameService,
} from './games-services';

export const getGamesController = async (req: Request, res: Response) => {
  const games = await getGamesService();
  res.status(200).json(games);
};

export const getGameController = async (req: Request, res: Response) => {
  const id = req.params['id'];
  const game = await getGameService(+id);
  res.status(200).json(game);
};

export const setGameController = async (req: Request, res: Response) => {
  const game = await setGameService();
  res.status(200).json(game);
};
