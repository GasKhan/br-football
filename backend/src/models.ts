import { RowDataPacket } from 'mysql2';

export interface IUser {
  id?: number;
  name: string;
}

export type RatingObj = {
  playerId: number;
  rating: number;
};

export type ResultObj = {
  teamId: number;
  points: number;
};

export type GameResult = {
  gameId: number;
  ratings: RatingObj[];
  results: ResultObj[];
};

export interface IGame extends RowDataPacket {
  id: number;
  date: string;
  isActive: 1 | 0;
}
export interface ITeam extends RowDataPacket {
  id: number;
  points: number;
  // color: string;
}
export interface IPlayer extends RowDataPacket {
  id: number;
}
