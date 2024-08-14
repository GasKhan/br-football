import { dbPool } from '../db';
import { toMySQLTime } from '../shared/toMySQLTime';

export const getGamesService = async () => {
  const games = await dbPool.query(`SELECT * FROM games`);
  return games;
};

export const getGameService = async (id: number) => {
  const game = await dbPool.query(`SELECT * FROM games WHERE game_id = ?`, id);
  return game;
};

export const setGameService = async () => {
  const date = toMySQLTime(new Date());
  const game = await dbPool.query(`INSERT INTO games (date) VALUES (?)`, date);
  return game;
};

export const setWinnerTeam = async (teamId: number, gameId: number) => {
  const game = await dbPool.query(
    'UPDATE games SET winner_team_id = ? WHERE game_id = ?',
    [teamId, gameId]
  );
  return game;
};
