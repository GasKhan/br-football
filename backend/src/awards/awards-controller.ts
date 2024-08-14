import { Request, Response } from 'express';
import { getAwardService, setAwardService } from './awards-service';

export const getAwardController = async (req: Request, res: Response) => {
  const { awardTypeId, month } = req.body;
  const award = await getAwardService(awardTypeId, month);

  res.status(200).json(award);
};

export const setAwardController = async (req: Request, res: Response) => {
  const { awardTypeId, playerId } = req.body;
  const award = await setAwardService(awardTypeId, playerId);

  res.status(200).json(award);
};
