import { Request, Response } from 'express';
import { getGoalsService, setGoalService } from './goals-service';

export const setGoalController = async (req: Request, res: Response) => {
  const { gameId, playerId, assistantId } = req.body;
  await setGoalService(gameId, playerId, assistantId);
  res.status(200);
};

export const getGoalsController = async (req: Request, res: Response) => {
  const playerId = req.params['playerId'];
  const goals = await getGoalsService(+playerId);
  res.status(200).json(goals);
};
