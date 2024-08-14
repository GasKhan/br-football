import { dbPool } from '../db';

export const getPlayersService = async () => {
  const players = dbPool.query(`SELECT * FROM players`);
  return players;
};

export const getPlayerService = async (id: number) => {
  const player = dbPool.query(`SELECT * FROM players WHERE player_id = ?`, id);
  return player;
};

export const createPlayerService = async (userData: { name: string }) => {
  const player = dbPool.query(
    `INSERT INTO players (name) VALUES (?)`,
    userData.name
  );

  return player;
};

export const updatePlayerService = async (
  id: number,
  updateFields: { name: string }
) => {
  const player = dbPool.query(
    `UPDATE players SET player_name = ? WHERE player_id = ?`,
    [updateFields.name, id]
  );
  return player;
};

export const deletePlayerService = async (id: number) => {
  const player = dbPool.query(`DELETE FROM players WHERE player_id = ?`, id);
  return player;
};
