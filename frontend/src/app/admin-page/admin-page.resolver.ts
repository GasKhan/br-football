import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { PlayersStore } from '../players-page/players.store';

export const AdminPageResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const playersService = inject(PlayersStore);
  playersService.fetchPlayers();
};
