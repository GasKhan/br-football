import { TeamColors } from './enums';

export type Player = {
  playerId: number;
  playerName: string;
  rating: number;
  teamPlayerId: number;
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
  teamPlayerId: number;
  playerRating: number;
};

export type GameResult = {
  ratings: Rating[];
  results: TeamPoints[];
};
