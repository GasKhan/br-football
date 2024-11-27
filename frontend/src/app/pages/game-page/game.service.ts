import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { Player } from '../../shared/types/types';

@Injectable({ providedIn: 'root' })
export class GameService {
  onCreateGame = new Subject();

  onAddPlayerToTeam = new Subject<Player>();

  createNewGame() {
    this.http
      .post('http://localhost:5000/api/games', {})
      .subscribe((gameData) => {
        this.onCreateGame.next(gameData);
      });
  }

  getPlayerWithId(id: number) {
    this.http
      .get(`http://localhost:5000/api/players/player/${id}`)
      .subscribe((player) => {
        console.log(player);
      });
  }

  constructor(private http: HttpClient) {}
}
