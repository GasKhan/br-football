import { dbPool } from '../db';
import { ScoreData } from '../types/score.model';

export const getPlayerAssistsService = async (playerId: number) => {
  const goals = await dbPool.query(
    `
    SELECT COUNT(assistant_id) AS assistsCount FROM scores WHERE assistant_id = ?
    `,
    playerId
  );
  return goals[0];
};

export const getTopAssistsService = async () => {
  const goalsData = await dbPool.query(
    ` SELECT COUNT(assistant_id) AS assistsCount, p.player_name AS playerName 
      FROM scores AS s
      INNER JOIN players AS p ON p.player_id = s.assistant_id
      GROUP BY p.player_name
      ORDER BY COUNT(assistant_id);
    `
  );
  return goalsData;
};
