import { Request, Response } from 'express';
import {
  createPlayerService,
  deletePlayerService,
  getPlayerByIdService,
  getPlayersService,
  editPlayerService,
} from './players.services';

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await getPlayersService();
    res.status(200).json(players);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};

export const getPlayerById = async (req: Request, res: Response) => {
  const id = req.params['id'];
  try {
    if (!id) {
      res.status(400).send({ message: 'Player id wasnt provided' });
    } else {
      const player = await getPlayerByIdService(+id);
      res.status(200).json(player);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error && err.message === 'Player not found') {
      res.status(404).send({ message: 'Player not found' });
    }
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const createPlayer = async (req: Request, res: Response) => {
  const { playerData } = req.body;
  try {
    if (!playerData) {
      res.status(400).send({ message: 'Player data wasnt provided' });
    } else {
      const player = await createPlayerService(playerData);
      res.status(201).json({ message: 'Player was successfully added' });
    }
  } catch (err) {
    console.log(err);
    //TODO: handle error properly
    // if (err instanceof Error && err.code === 'P2002') {
    //   return res.status(409).json({ error: 'Email already exists' });
    // }
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const editPlayer = async (req: Request, res: Response) => {
  const id = req.params['id'];
  //TODO: move id to body ??
  const { updateFields } = req.body;
  try {
    if (!id || !updateFields)
      res.status(400).send({ message: 'Data for updating wasnt provided' });
    else {
      await editPlayerService(+id, updateFields);
      res.status(200).json({ message: 'Player was successfully edited' });
    }
  } catch (err) {
    console.log(err);
    //TODO: handle error properly
    // if (e.code === 'P2025') {
    //   throw new Error('User not found, cannot update');
    // }
    // throw e;
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  const id = req.params['id'];
  try {
    if (!id)
      res.status(400).send({ message: 'Id for deleting user wasnt provided' });
    else {
      await deletePlayerService(+id);
      res.status(204);
    }
  } catch (err) {
    console.log(err);
    //TODO: handle error properly
    // if (e.code === 'P2025') {
    //   throw new Error('User not found, cannot update');
    // }
    // throw e;
    res.status(500).send({ message: 'Internal server error' });
  }
};
