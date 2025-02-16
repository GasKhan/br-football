import { RowDataPacket } from 'mysql2';

export interface IUser {
  id?: number;
  name: string;
}

export type RatingObj = {
  playerId: number;
  gameId: number;
  playerRating: number;
};

export interface IGame extends RowDataPacket {
  id: number;
  date: string;
}
export interface ITeam extends RowDataPacket {
  id: number;
}
export interface IPlayer extends RowDataPacket {
  id: number;
}
