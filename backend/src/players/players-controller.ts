import { Request, Response } from 'express';
import {
  createPlayerService,
  deletePlayerService,
  getPlayerService,
  getPlayersService,
  updatePlayerService,
} from './players-service';

export const getPlayersController = async (req: Request, res: Response) => {
  const players = await getPlayersService();
  res.json(players);
};

export const getPlayerController = async (req: Request, res: Response) => {
  const id = req.params['id'];
  const player = await getPlayerService(+id);

  res.json(player);
};

export const createPlayerController = async (req: Request, res: Response) => {
  const playerData = req.body;
  const player = await createPlayerService(playerData);

  res.status(200).json(player[0]);
};

export const updatePlayerController = async (req: Request, res: Response) => {
  const id = req.params['id'];
  const updateFields = req.body;
  const player = await updatePlayerService(+id, updateFields);

  res.json(player);
};

export const deletePlayerController = async (req: Request, res: Response) => {
  const id = req.params['id'];
  const player = await deletePlayerService(+id);

  res.status(200).json(null);
};
