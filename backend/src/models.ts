export interface IUser {
  id?: number;
  name: string;
}

export type RatingObj = {
  playerId: number;
  gameId: number;
  playerRating: number;
};
