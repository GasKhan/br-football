import { inject, Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import { Player } from './shared/types/types';
import { PlayersService } from './shared/players.service';

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
          tap((players) => this.addPlayers(players)),
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

  readonly addPlayers = this.updater((state, players: Player[]) => {
    return { ...state, players };
  });
}
