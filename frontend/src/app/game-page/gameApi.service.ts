import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, GameDate, GameResult } from '../shared/types/types';

const GAMES_ROUTE = 'http://localhost:5000/api/games';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  getGameData(id?: number) {
    if (id) {
      return this.http.get<Game>(GAMES_ROUTE + `/${id}`);
    } else {
      return this.http.get<Game>(GAMES_ROUTE + '/active');
    }
  }

  getGameDates() {
    return this.http.get<GameDate[]>(GAMES_ROUTE + '/dates');
  }

  saveGameResults(gameResults: GameResult) {
    return this.http.post<GameResult>(GAMES_ROUTE + '/results', {
      gameResults,
    });
  }
  constructor(private http: HttpClient) {}
}
