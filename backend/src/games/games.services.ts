import { ResultSetHeader } from 'mysql2';
import { dbPool } from '../db';
import { toMySQLTime } from '../shared/toMySQLTime';
import { GameResult } from '../goals/gameResult.model';
import { Team } from '../models/team.model';
import { PoolConnection } from 'mysql2/promise';
import { IGame, IPlayer, ITeam } from '../models';

export const getGamesService = async () => {
  const games = await dbPool.query(`SELECT * FROM games`);
  return games;
};

export const getGameService = async (id: number) => {
  const game = await dbPool.query<ResultSetHeader>(
    `SELECT * FROM games WHERE game_id = ?`,
    id
  );
  return game;
};

export const getGameDataService = async (id?: number) => {
  let gameData;
  const connection = await dbPool.getConnection();

  try {
    if (id) {
      gameData = await connection.query<IGame[]>(
        `SELECT game_id AS id, date FROM games WHERE game_id = ?`,
        [id]
      );
    } else {
      gameData = await connection.query<IGame[]>(
        `SELECT game_id AS id, date FROM games WHERE is_active = 1`
      );
    }

    if (gameData[0].length === 0) {
      throw new Error('Game not found');
    }

    const teams = await getTeamsFromGame(connection, gameData[0][0].id);
    return { gameId: gameData[0][0].id, teams };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    connection.release();
  }
};

export const setGameService = async (teams: Team[]) => {
  const date = toMySQLTime(new Date());
  const connection = dbPool.getConnection();

  try {
    (await connection).beginTransaction();

    const [game] = await dbPool.query<ResultSetHeader>(
      `INSERT INTO games (date, is_active) VALUES (?, true)`,
      [date]
    );
    const gameId = game.insertId;

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

  const teamPlayerIds = await Promise.all(
    team.playerIds.map((playerId) =>
      insertPlayerIntoTeam(connection, playerId, teamId)
    )
  );
  return { teamId, playerIds: team.playerIds };
};

const getTeamsFromGame = async (connection: PoolConnection, gameId: number) => {
  const [teamsInDB] = await connection.query<ITeam[]>(
    `SELECT team_id AS id FROM teams WHERE game_id = ?
    `,
    gameId
  );

  const team = await Promise.all(
    teamsInDB.map((team) => getPlayersFromTeam(connection, team.id))
  );
  return {
    team,
  };
};

const insertPlayerIntoTeam = async (
  connection: Promise<PoolConnection>,
  playerId: number,
  teamId: number
) => {
  const [result] = await (
    await connection
  ).query<ResultSetHeader>(
    `INSERT INTO teams_players (team_id, player_id)
    VALUES (?,?)
    `,
    [teamId, playerId]
  );
  return result.insertId;
};

const getPlayersFromTeam = async (
  connection: PoolConnection,
  teamId: number
) => {
  const [players] = await connection.query<IPlayer[]>(
    `SELECT t_p.team_player_id, p.*
     FROM teams_players AS t_p
     INNER JOIN players AS p ON t_p.player_id = p.player_id
     WHERE t_p.team_id = ?
    `,
    [teamId]
  );
  // const [players] = await connection.query<IPlayer[]>(
  //   `SELECT p.*, AVG(r.rating) as average_rating
  //    FROM players AS p
  //    LEFT JOIN ratings AS r ON p.player_id = r.player_id
  //    GROUP BY p.player_id
  //   `,
  //   [teamId]
  // );
  return { teamId, players };
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

// Search if there any active game still in database
const searchIsActiveGameInDB = async () => {
  const activeGame = dbPool.query(
    `SELECT * FROM games
    WHERE is_active = true
    `
  );
};

// export const setWinnerTeam = async (teamId: number, gameId: number) => {
//   const game = await dbPool.query(
//     'UPDATE games SET winner_team_id = ? WHERE game_id = ?',
//     [teamId, gameId]
//   );
// };
