import { Request, Response } from 'express';
import {
  getPlayerGoalsService,
  getTopGoalsService,
  setGoalService,
} from './goals.services';

export const getGoalsControllerByPlayer = async (
  req: Request,
  res: Response
) => {
  try {
    const { playerId } = req.query;
    if (playerId) {
      const goals = await getPlayerGoalsService(+playerId);
      res.status(200).json({ goals });
    } else res.status(400).send({ message: "Player id wasn't provided" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
};

export const getTopGoalsController = async (req: Request, res: Response) => {
  try {
    const goalsData = await getTopGoalsService();
    res.status(200).json({ goalsData });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
};

export const setGoalController = async (req: Request, res: Response) => {
  try {
    const { scoreData } = req.body;
    if (!scoreData)
      res.status(400).send({ message: 'Score data wasnt provided' });
    else {
      await setGoalService(scoreData);
      res.status(200).send({ message: "Goal'(s) successfully added" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'Bad request' });
  }
};
