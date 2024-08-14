import { dbPool } from '../db';

export const getAwardService = async (awardTypeId: number, month: number) => {
  const award = await dbPool.query(
    `
    SELECT * FROM awards WHERE award_type_id = ? AND month = ?
    `,
    [awardTypeId, month]
  );
  return award[0];
};

export const setAwardService = async (
  awardTypeId: number,
  playerId: number
) => {
  const month = new Date().getMonth();
  const award = await dbPool.query(
    `
    INSERT INTO awards (award_type_id, player_id, month)
    VALUES (?, ?, ?)
    `,
    [awardTypeId, playerId, month]
  );

  return award[0];
};
