import { dbPool } from '../db';
import { RatingObj } from '../models';

export const getRatingService = async (
  playerId: number,
  month: number,
  year: number
) => {
  const playerRating = await dbPool.query(
    `SELECT AVG(rating) FROM ratings AS r
    INNER JOIN teams_players AS t_p
    ON r.player_id = t_p.team_player_id
    WHERE t_p.player_id = ?`,
    [playerId]
  );

  return playerRating[0];
};

export const getRatingsService = async () => {
  const playerRating = await dbPool.query(
    `SELECT AVG(rating) as rating, p.player_name as playerName
    FROM ratings as r 
    INNER JOIN players as p
    ON r.player_id = p.player_id
    GROUP BY r.player_id
    ORDER BY AVG(rating)
    `
  );

  return playerRating[0];
};

export const getWinsInfoByPlayerId = async (playerId: number) => {
  const winsRatingForPlayer = await dbPool.query(
    `
    SELECT g.game_id AS gameId, g.winner_team_id AS winnerTeamId 
    FROM games AS g
    LEFT JOIN teams AS t ON g.game_id = t.game_id
    LEFT JOIN teams_players AS t_p ON t.team_id = t_p.team_id
    LEFT JOIN players as p ON p.player_id = t_p.player_id
    WHERE p.player_id = ?
    `,
    [playerId]
  );

  return winsRatingForPlayer[0];
};

export const setRatingsService = async (ratings: RatingObj[]) => {
  const sqlInsertValues = ratings
    .map((ratingObj) => {
      return `( ${Object.values(ratingObj).join(', ')})`;
    })
    .join(', ');

  await dbPool.query(`
    INSERT INTO ratings (player_id, game_id, rating)
    VALUES ${sqlInsertValues}
    `);
};
