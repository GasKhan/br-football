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