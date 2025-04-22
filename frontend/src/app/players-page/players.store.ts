import { inject, Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import { Player } from '../shared/types/types';
import { PlayersService } from './playersApi.service';

export type PlayersState = {
  players: Player[];
};

@Injectable({ providedIn: 'root' })
export class PlayersStore extends ComponentStore<PlayersState> {
  constructor() {
    super({ players: [] });
  }

  readonly playersService = inject(PlayersService);

  readonly players$ = this.select((state) => state.players);

  readonly fetchPlayers = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      exhaustMap(() => {
        return this.playersService.getAllPlayers().pipe(
          tap((players) => this.setPlayers(players)),
          catchError((err) => {
            console.log(err);
            return EMPTY;
          })
        );
      })
    );
  });

  readonly createPlayer = this.effect<string>((playerName$) => {
    return playerName$.pipe(
      exhaustMap((playerName) => {
        return this.playersService.createPlayer(playerName).pipe(
          tap(() => {
            this.fetchPlayers();
          }),
          catchError((err) => {
            console.log(err);
            return EMPTY;
          })
        );
      })
    );
  });

  getfilteredPlayersBySubstr(substr: string) {
    if (substr === '') return of([]);

    const lowerSubstr = substr.toLowerCase();
    return this.players$.pipe(
      map((players) => {
        return players.filter((player) =>
          player.playerName.toLowerCase().startsWith(lowerSubstr)
        );
      })
    );
  }

  readonly setPlayers = this.updater((state, players: Player[]) => {
    return { ...state, players };
  });
}
