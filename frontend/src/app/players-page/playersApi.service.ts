import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player, Rating } from '../shared/types/types';

const PLAYERS_ROUTE = 'http://localhost:5000/api/players';
@Injectable({ providedIn: 'root' })
export class PlayersService {
  createPlayer(playerName: string) {
    return this.http.post(PLAYERS_ROUTE, {
      playerData: { name: playerName },
    });
  }

  getAllPlayers() {
    return this.http.get<Player[]>(PLAYERS_ROUTE);
  }

  getPlayerById(id: number) {
    return this.http.get(PLAYERS_ROUTE + id);
  }
  constructor(private http: HttpClient) {}
}
