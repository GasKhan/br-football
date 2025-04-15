import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, GameResult } from '../shared/types/types';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  getActiveGameData() {
    return this.http.get<Game>('http://localhost:5000/api/games/active');
  }

  saveGameResults(gameResult: GameResult) {
    return this.http.post<GameResult>(
      'http://localhost:5000/api/games/results',
      gameResult
    );
  }
  constructor(private http: HttpClient) {}
}
