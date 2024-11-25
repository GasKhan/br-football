import { ResultSetHeader } from 'mysql2';
import { dbPool } from '../db';
import { toMySQLTime } from '../shared/toMySQLTime';
import { GameResult } from '../goals/gameResult.model';
import { Team } from '../models/team.model';
import { PoolConnection } from 'mysql2/promise';

export const getGamesService = async () => {
  const games = await dbPool.query(`SELECT * FROM games`);
  return games;
};

export const getGameService = async (id: number) => {
  const game = await dbPool.query(`SELECT * FROM games WHERE game_id = ?`, id);
  return game;
};

export const setGameService = async (teams: Team[]) => {
  const date = toMySQLTime(new Date());
  const connection = dbPool.getConnection();

  try {
    (await connection).beginTransaction();

    const game = await dbPool.query<ResultSetHeader>(
      `INSERT INTO games (date) VALUES (?)`,
      [date]
    );
    const gameId = game[0].insertId;

    await Promise.all(
      teams.map((team) => insertTeamInDB(connection, team, gameId))
    );

    (await connection).commit();
  } catch (err) {
    console.log(err);
    (await connection).rollback();
  } finally {
    (await connection).release();
  }
};

export const setGameResultService = async (gameResults: GameResult[]) => {
  const connection = dbPool.getConnection();
  try {
    (await connection).beginTransaction();

    await Promise.all(
      gameResults.map((gameResult) => setResultInDB(connection, gameResult))
    );
    (await connection).commit();
  } catch (err) {
    (await connection).rollback();
    console.log(err);
  } finally {
    (await connection).release();
  }
};

const setResultInDB = async (
  connection: Promise<PoolConnection>,
  { points, teamId }: GameResult
) => {
  (await connection).query(
    `
    UPDATE teams
    SET points = ?
    WHERE team_id = ?
    `,
    [points, teamId]
  );
};

const insertTeamInDB = async (
  connection: Promise<PoolConnection>,
  team: Team,
  gameId: number
) => {
  const teamInDB = (await connection).query<ResultSetHeader>(
    `INSERT INTO teams (game_id)
  VALUES (?)
  `,
    gameId
  );
  const teamId = (await teamInDB)[0].insertId;

  await Promise.all(
    team.playerIds.map((playerId) =>
      insertPlayerIntoTeam(connection, playerId, teamId)
    )
  );
};

const insertPlayerIntoTeam = async (
  connection: Promise<PoolConnection>,
  playerId: number,
  teamId: number
) => {
  (await connection).query(
    `INSERT INTO teams_players (team_id, player_id)
    VALUES (?,?)
    `,
    [teamId, playerId]
  );
};

const searchIsActiveGameInDB = async () => {
  const activeGame = dbPool.query(
    `SELECT * FROM games
    WHERE isActive = true
    `
  );
};
// export const setWinnerTeam = async (teamId: number, gameId: number) => {
//   const game = await dbPool.query(
//     'UPDATE games SET winner_team_id = ? WHERE game_id = ?',
//     [teamId, gameId]
//   );
// };
