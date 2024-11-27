import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../types/types';

export type Rating = {
  rating: number;
  playerName: string;
};

@Injectable({ providedIn: 'root' })
export class PlayersService {
  createPlayer(playerName: string) {
    return this.http
      .post('http://localhost:5000/api/players', { playerData: playerName })
      .subscribe((res) => console.log(res));
  }

  getAllPlayers() {
    return this.http.get<Player[]>('http://localhost:5000/api/players');
  }

  getRatings() {
    return this.http.get<Rating[]>('http://localhost:5000/api/ratings');
  }
  constructor(private http: HttpClient) {}
}
