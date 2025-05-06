import { RatingObj } from '../models';
import { Team } from './team.model';

export interface Player {
  id: number;
  name: string;
  teams: Team[];
  ratings: RatingObj[];
}
