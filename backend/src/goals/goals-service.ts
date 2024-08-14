import { dbPool } from '../db';

export const setGoalService = async (
  playerId: number,
  gameId: number,
  assistantId?: number
) => {
  const date = await dbPool.query(
    `
    SELECT date FROM games WHERE game_id = `,
    gameId
  );

  const res = await dbPool.query(
    `
    INSERT INTO scores (player_id, game_id,date, ${
      assistantId ? 'assistant_id' : ''
    })
    VALUES (?, ?,?, ${assistantId ? '?' : ''})
    `,
    [playerId, gameId, date, assistantId]
  );

  return res[0];
};

export const getGoalsService = async (playerId: number) => {
  const goals = await dbPool.query(
    `
      SELECT COUNT (score_id) FROM scores WHERE player_id = ?
    `,
    playerId
  );
  return goals[0];
};
