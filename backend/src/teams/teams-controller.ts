import { Request, Response } from 'express';
import { getTeamsForGameService, setTeamService } from './teams-service';

export const getTeamsForGameController = async (
  req: Request,
  res: Response
) => {
  const gameId = req.params['id'];
  const team = await getTeamsForGameService(+gameId);

  res.status(200).json(team);
};

export const setTeamController = async (req: Request, res: Response) => {
  const { gameId, playerIds } = req.body;

  await setTeamService(gameId, playerIds);
  res.status(200);
};
