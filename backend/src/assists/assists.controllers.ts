import { Request, Response } from 'express';
import {
  getTopAssistsService,
  getPlayerAssistsService,
} from './assists.services';

export const getAssistsControllerByPlayer = async (
  req: Request,
  res: Response
) => {
  try {
    const { playerId } = req.query;
    if (playerId) {
      const assists = await getPlayerAssistsService(+playerId);
      res.status(200).json({ assists });
    } else res.status(400).send({ message: "Player id wasn't provided" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
};

export const getTopAssistsController = async (req: Request, res: Response) => {
  try {
    const assistsData = await getTopAssistsService();
    res.status(200).json({ assistsData });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
};
