import { TeamColors } from './enums';

export type Player = {
  playerId: number;
  playerName: string;
};

export type Team = {
  teamColor: TeamColors;
  players: Player[];
  points: number;
};
