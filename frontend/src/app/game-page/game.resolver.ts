import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../shared/types/types';
import { GameService } from './game.service';

export const gamePageResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const gameService = inject(GameService);

  return gameService.getActiveGameData();
};
