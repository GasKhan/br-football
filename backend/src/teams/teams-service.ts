import { dbPool } from '../db';

export const getTeamsForGameService = async (gameId: number) => {
  const teams = await dbPool.query(
    `SELECT * FROM teams WHERE game_id = ?`,
    gameId
  );
  return teams;
};

export const setTeamService = async (gameId: number, playerIdArr: number[]) => {
  const team = await dbPool.query(
    `INSERT INTO teams (game_id) VALUES (?)`,
    gameId
  );

  const playerIdStrforSQL = playerIdArr
    .map((id) => {
      return `(${team[0]}, ${id})`;
    })
    .join(', ');
  await dbPool.query(
    `
    INSERT INTO teams_players (team_id, player_id) VALUES ?`,
    playerIdStrforSQL
  );
};
