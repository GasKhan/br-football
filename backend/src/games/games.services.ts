import { ResultSetHeader } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import { dbPool } from '../db';
import { toMySQLTime } from '../shared/toMySQLTime';
import { Team } from '../models/team.model';
import {
  GameResult,
  IGame,
  IPlayer,
  ITeam,
  RatingObj,
  ResultObj,
} from '../models';

export const getGamesService = async () => {
  const games = await dbPool.query(`SELECT * FROM games`);
  return games;
};

export const getGameDataService = async (id?: number) => {
  let gameData;
  const connection = await dbPool.getConnection();

  try {
    if (id) {
      gameData = await connection.query<IGame[]>(
        `SELECT game_id AS id, date, is_active AS isActive FROM games WHERE game_id = ?`,
        [id]
      );
    } else {
      gameData = await connection.query<IGame[]>(
        `SELECT game_id AS id, date, is_active AS isActive FROM games WHERE is_active = 1`
      );
    }

    if (gameData[0].length === 0) {
      throw new Error('Game not found');
    }

    const { id: gameId, isActive, date } = gameData[0][0];
    const teams = await getTeamsFromGame(connection, gameId);
    return {
      gameId,
      isActive,
      date,
      teams,
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    connection.release();
  }
};

export const setGameService = async (teams: Team[]) => {
  //TODO: Check if there active game already exists
  const date = toMySQLTime(new Date());
  const connection = dbPool.getConnection();

  try {
    (await connection).beginTransaction();

    const [game] = await dbPool.query<ResultSetHeader>(
      `INSERT INTO games (date, is_active) VALUES (?, true)`,
      [date]
    );

    if (!game) throw new Error('Game not created');
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

  if (!teamInDB) throw new Error('Team not created');
  const teamId = (await teamInDB)[0].insertId;

  const teamPlayerIds = await Promise.all(
    team.players.map((player) =>
      insertPlayerIntoTeam(connection, player.playerId, teamId)
    )
  );
  return { teamId, playerIds: teamPlayerIds };
};

const getTeamsFromGame = async (connection: PoolConnection, gameId: number) => {
  const [teamsInDB] = await connection.query<ITeam[]>(
    `SELECT team_id AS id, points FROM teams WHERE game_id = ?
    `,
    gameId
  );

  const teams = await Promise.all(
    teamsInDB.map(async (team) => ({
      id: team.id,
      points: team.points,
      players: await getPlayersFromTeam(connection, team.id),
    }))
  );

  return teams;
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
    `SELECT t_p.team_player_id AS teamPlayerId, p.player_id AS playerId, player_name AS playerName, IFNULL(r.rating, 0) AS rating
     FROM teams_players AS t_p
     INNER JOIN players AS p ON t_p.player_id = p.player_id
     LEFT JOIN ratings AS r ON t_p.team_player_id = r.team_player_id
     WHERE t_p.team_id = ?
    `,
    [teamId]
  );
  console.log(players);
  return players;
};

const setGameIsInactive = async (gameId: number) => {
  await dbPool.query(
    `UPDATE games
      SET is_active = false
      WHERE game_id = ?`,
    [gameId]
  );
};

const setGamePointsService = async (gameResults: ResultObj[]) => {
  const res = await Promise.all(
    gameResults.map((gameResult) => {
      return dbPool.query(
        `
          UPDATE teams
          SET points = ?
          WHERE team_id = ?
          `,
        [gameResult.points, gameResult.teamId]
      );
    })
  );
  return res;
};

const setRatingsService = async (ratings: RatingObj[]) => {
  const sqlInsertValues = ratings
    .map((ratingObj) => {
      return `( ${Object.values(ratingObj).join(', ')})`;
    })
    .join(', ');

  const res = await dbPool.query(`
      INSERT INTO ratings (team_player_id, rating)
      VALUES ${sqlInsertValues}
      `);

  return res;
};

export const setGameResultService = async (gameResults: GameResult) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    await setGameIsInactive(gameResults.gameId);
    await setGamePointsService(gameResults.results);
    await setRatingsService(gameResults.ratings);

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.log(err);
  } finally {
    connection.release();
  }
};
