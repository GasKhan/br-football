import { dbPool } from '../db';

export const getPlayersService = async () => {
  const players = await dbPool.query(`SELECT player_id AS playerId, player_name AS playerName FROM players`);
  return players[0];
};

// export const getPlayersService = async (nameSmpl: string) => {
//   const n = nameSmpl + '%';
//   const players = await dbPool.query(
//     `SELECT player_id as playerId, player_name as playerName FROM players WHERE player_name LIKE ?`,
//     n
//   );
//   return players[0];
// };

export const getPlayerByIdService = async (id: number) => {
  const player = await dbPool.query(
    `SELECT * FROM players WHERE player_id = ?`,
    id
  );
  return player[0];
};

export const createPlayerService = async (userData: string) => {
  const player = await dbPool.query(
    `INSERT INTO players (Player_name) VALUES (?)`,
    userData
  );

  return player[0];
};

export const editPlayerService = async (
  id: number,
  updateFields: { playerName: string }
) => {
  const player = await dbPool.query(
    `UPDATE players SET player_name = ? WHERE player_id = ?`,
    [updateFields.playerName, id]
  );
  return player[0];
};

export const deletePlayerService = async (id: number) => {
  const player = await dbPool.query(
    `DELETE FROM players WHERE player_id = ?`,
    id
  );
  return player[0];
};
