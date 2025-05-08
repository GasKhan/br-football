import { NextFunction, Request, Response } from 'express';
import {
  createPlayerService,
  deletePlayerService,
  getPlayerByIdService,
  getPlayersService,
  editPlayerService,
} from './players.services';
import { BadRequestError } from '../shared/errors/badRequestError';
import { NotFoundError } from '../shared/errors/notFoundError';
import { ConflictError } from '../shared/errors/conflictError';

export const getPlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const players = await getPlayersService();
    res.status(200).json(players);
  } catch (err) {
    next(err);
  }
};

export const getPlayerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params['id'];
  try {
    if (!id) {
      next(new BadRequestError({ message: 'Player id wasnt provided' }));
    } else {
      const player = await getPlayerByIdService(+id);
      res.status(200).json(player);
    }
  } catch (err) {
    next(err);
  }
};

export const createPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { playerData } = req.body;
  try {
    if (!playerData) {
      next(new BadRequestError({ message: 'Player data wasnt provided' }));
    } else {
      const player = await createPlayerService(playerData);
      res.status(201).json({ message: 'Player was successfully added' });
    }
  } catch (err: any) {
    if (err.code === 'P2002') {
      next(new ConflictError({ message: 'Email already exists' }));
    }
    next(err);
  }
};

export const editPlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params['id'];
  //TODO: move id to body ??
  const { updateFields } = req.body;
  try {
    if (!id || !updateFields)
      next(
        new BadRequestError({ message: 'Data for updating wasnt provided' })
      );
    else {
      await editPlayerService(+id, updateFields);
      res.status(200).json({ message: 'Player was successfully edited' });
    }
  } catch (err: any) {
    if (err.code === 'P2025') {
      next(new NotFoundError({ message: 'User not found, cannot update' }));
    } else {
      next(err);
    }
  }
};

export const deletePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params['id'];
  try {
    if (!id) {
      next(
        new BadRequestError({ message: 'Id for deleting user wasnt provided' })
      );
    } else {
      await deletePlayerService(+id);
      res.status(204).send();
    }
  } catch (err: any) {
    if (err.code === 'P2025') {
      next(new NotFoundError({ message: 'User not found, cannot delete' }));
    } else {
      next(err);
    }
  }
};
