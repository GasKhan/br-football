import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player, Rating } from '../shared/types/types';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  createPlayer(playerName: string) {
    return this.http.post('http://localhost:5000/api/players', {
      playerData: playerName,
    });
  }

  getAllPlayers() {
    return this.http.get<Player[]>('http://localhost:5000/api/players');
  }

  getPlayerById(id: number) {
    return this.http.get(`http://localhost:5000/api/players/player/${id}`);
  }

  getRatings() {
    return this.http.get<Rating[]>('http://localhost:5000/api/ratings');
  }
  constructor(private http: HttpClient) {}
}
