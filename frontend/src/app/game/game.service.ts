import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { Player } from '../types/types';

@Injectable({ providedIn: 'root' })
export class GameService {
  onCreateGame = new Subject();
  nameStartWithCache: Record<string, Player[]> = {};

  onAddPlayerToTeam = new Subject<Player>();

  createNewGame() {
    this.http
      .post('http://localhost:5000/api/games', {})
      .subscribe((gameData) => {
        this.onCreateGame.next(gameData);
      });
  }

  getAllPlayers() {
    this.http
      .get(`http://localhost:5000/api/players`)
      .subscribe((playersArr) => {
        console.log(playersArr);
      });
  }

  getPlayersStartWith(smpl: string) {
    if (this.nameStartWithCache[smpl])
      return of<Player[]>(this.nameStartWithCache[smpl]);

    return this.http
      .get<Player[]>(`http://localhost:5000/api/players/${smpl}`)
      .pipe(
        tap((playersArr) => {
          if (Array.isArray(playersArr))
            this.nameStartWithCache[smpl] = [...playersArr];
        })
      );
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
