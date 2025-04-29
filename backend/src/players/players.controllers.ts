import { Request, Response } from 'express';
import {
  createPlayerService,
  deletePlayerService,
  getPlayerByIdService,
  getPlayersService,
  editPlayerService,
  getPlayerbyNameService,
} from './players.services';

export const getPlayersByNameController = async (
  req: Request,
  res: Response
) => {
  const nameSmpl = req.params['nameSmpl'];
  try {
    if (!nameSmpl) {
      res.status(400).send({ message: 'Player name wasnt provided' });
    } else {
      const players = await getPlayerbyNameService(nameSmpl);
      res.status(200).json(players);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};

export const getPlayersController = async (req: Request, res: Response) => {
  try {
    const players = await getPlayersService();
    res.status(200).json(players);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};

// export const getPlayersController = async (req: Request, res: Response) => {
//   const nameSmpl = req.params['nameSmpl'];
//   const players = await getPlayersService(nameSmpl);
//   res.json(players);
// };

export const getPlayerController = async (req: Request, res: Response) => {
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
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const createPlayerController = async (req: Request, res: Response) => {
  const { playerData } = req.body;
  try {
    if (!playerData) {
      res.status(400).send({ message: 'Player data wasnt provided' });
    } else {
      const player = await createPlayerService(playerData);
      res.status(200).json({ message: 'Player was successfully added' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const editPlayerController = async (req: Request, res: Response) => {
  const id = req.params['id'];
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
    res.status(500).send({ message: 'Internal server error' });
  }
};

export const deletePlayerController = async (req: Request, res: Response) => {
  const id = req.params['id'];
  try {
    if (!id)
      res.status(400).send({ message: 'Id for deleting user wasnt provided' });
    else {
      await deletePlayerService(+id);
      res.status(200).json({ message: 'Player was successfully deleted' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};
