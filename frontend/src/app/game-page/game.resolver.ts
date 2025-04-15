import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { GameService } from './game.service';

export const gamePageResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const gameService = inject(GameService);

  const id = route.params['id'];
  console.log(id);
  if (id) {
    gameService.getGameData(id);
  } else {
    gameService.getGameData();
  }
};
