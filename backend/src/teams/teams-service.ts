import { dbPool } from '../db';

export const getWinnerTeams = async () => {
  const winnerTeams = dbPool.query(
    `
    SELECT t.game_id AS gameId, t.team_id AS teamId, MAX(t.points) AS maxPoints, g.date AS date, t_p.player_id AS playerId
    FROM teams AS t
    INNER JOIN games AS g ON g.game_id = t.game_id
    INNER JOIN teams_players AS t_p 
    ON t_p.team_id = t.team_id
    WHERE t.points = (
      SELECT MAX(points)
      FROM teams
      WHERE game_id = t.game_id
    )
    GROUP BY t.team_id, t.game_id, g.date, t_p.player_id;
    `
  );
};
