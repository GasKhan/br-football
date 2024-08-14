import { dbPool } from '../db';
import { RatingObj } from '../models';

export const setRatingsService = async (ratings: RatingObj[]) => {
  const date = dbPool.query(
    `SELECT date FROM games WHERE game_id = ?`,
    ratings[0].gameId
  );

  const sqlInsertValues = ratings
    .map((ratingObj) => {
      return `( ${Object.values(ratingObj).join(', ')}, ${date} )`;
    })
    .join(', ');
  //TODO: Check for sql injection

  await dbPool.query(`
    INSERT INTO ratings_for_game (player_id, game_id, player, rating, date)
    VALUES ${sqlInsertValues}
    `);
};

export const getRatingService = async (
  playerId: number,
  month: number,
  year: number
) => {
  const playerRating = await dbPool.query(
    `SELECT AVG (rating) FROM ratings_for_game 
    WHERE player_id = ? AND MONTH (date) = ? AND YEAR (date) = ? `,
    [playerId, month, year]
  );

  return playerRating;
};
