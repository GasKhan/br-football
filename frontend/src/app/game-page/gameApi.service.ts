import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, GameResult } from '../shared/types/types';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  getGameData(id?: number) {
    if (id) {
      return this.http.get<Game>('http://localhost:5000/api/games/' + id);
    } else {
      return this.http.get<Game>('http://localhost:5000/api/games/active');
    }
  }

  saveGameResults(gameResults: GameResult) {
    return this.http.post<GameResult>(
      'http://localhost:5000/api/games/results',
      { gameResults }
    );
  }
  constructor(private http: HttpClient) {}
}
