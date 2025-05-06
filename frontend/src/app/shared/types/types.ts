import { TeamColors } from './enums';

export type Player = {
  id: number;
  name: string;
  rating: number;
};

export type Team = {
  id?: number;
  teamColor: TeamColors;
  players: Player[];
  points: number;
};

export type Game = {
  id: number;
  teams: Team[];
  isActive: boolean;
  date: string;
};

export type TeamPoints = {
  teamId: number;
  points: number;
};

export type Rating = {
  playerId: number;
  rating: number;
};

export type AvgRating = { playerName: string; rating: string };

export type GameResult = {
  gameId: number;
  ratings: Rating[];
  results: TeamPoints[];
};
