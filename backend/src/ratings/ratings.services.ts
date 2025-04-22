import { dbPool } from '../db';
import { GameResult, RatingObj, ResultObj } from '../models';

export const getRatingService = async (
  playerId: number,
  month: number,
  year: number
) => {
  const playerRating = await dbPool.query(
    `SELECT AVG(rating) FROM ratings AS r
    INNER JOIN teams_players AS t_p
    ON r.team_player_id = t_p.team_player_id
    WHERE t_p.player_id = ?`,
    [playerId]
  );

  return playerRating[0];
};

export const getRatingsService = async (month?: number) => {
  //TODO: remove 4
  month = month || 4 || new Date().getMonth();
  const playerRatingsWithGames = await dbPool.query(
    `SELECT 
       p.player_name AS playerName,
       AVG(r.rating) AS rating
     FROM players AS p
     INNER JOIN teams_players AS t_p ON p.player_id = t_p.player_id
     INNER JOIN ratings AS r ON t_p.team_player_id = r.team_player_id
     INNER JOIN teams AS t ON t_p.team_id = t.team_id
     INNER JOIN games AS g ON t.game_id = g.game_id
     WHERE MONTH(g.date) = ?
     GROUP BY p.player_id
     ORDER BY AVG(r.rating) DESC
    `,
    [month]
  );

  return playerRatingsWithGames[0];
};

export const getWinsInfoByPlayerId = async (playerId: number) => {
  const winsRatingForPlayer = await dbPool.query(
    `
    SELECT g.game_id AS gameId, g.winner_team_id AS winnerTeamId 
    FROM games AS g
    LEFT JOIN teams AS t ON g.game_id = t.game_id
    LEFT JOIN teams_players AS t_p ON t.team_id = t_p.team_id
    LEFT JOIN players as p ON p.player_id = t_p.team_player_id
    WHERE p.player_id = ?
    `,
    [playerId]
  );

  return winsRatingForPlayer[0];
};
