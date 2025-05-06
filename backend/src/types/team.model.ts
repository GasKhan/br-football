import { Player } from './player.model';

enum TeamColor {
  BLUE = 'BLUE',
  RED = 'RED',
  YELLOW = 'YELLOW',
}

export interface Team {
  teamColor: TeamColor;
  points: number;
  players: Player[];
}
