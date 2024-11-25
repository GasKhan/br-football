import { dbPool } from '../db';
import { ScoreData } from '../models/score.model';

export const getPlayerGoalsService = async (playerId: number) => {
  const goals = await dbPool.query(
    `
    SELECT COUNT(score_id) AS scoresCount FROM scores WHERE player_id = ?
    `,
    playerId
  );
  return goals[0];
};

export const getTopGoalsService = async () => {
  const goalsData = await dbPool.query(
    ` SELECT COUNT(score_id) AS scoresCount, p.player_name AS playerName 
      FROM scores AS s
      INNER JOIN players AS p ON p.player_id = s.player_id
      GROUP BY s.player_id
      ORDER BY COUNT(score_id);
    `
  );
  return goalsData;
};

export const setGoalService = async (scoreData: ScoreData[]) => {
  const queryStr = scoreData.reduce((res, score) => {
    return (
      res +
      `VALUES (${score.playerId},${score.gameId},${
        score.assistantId || 'NULL'
      })`
    );
  }, '');

  const res = await dbPool.query(
    `
    INSERT INTO scores (player_id, game_id, assistant_id)
    ${queryStr}
    `
  );

  return res[0];
};
