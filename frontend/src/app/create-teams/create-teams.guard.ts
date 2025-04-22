import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs/operators';
import { GameApiService } from '../game-page/gameApi.service';

export const createTeamsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const gameApiService = inject(GameApiService);

  //TODO: create a popup to show that the game already exists
  return gameApiService.getGameData().pipe(
    take(1),
    map((game) => {
      if (!game) return true;
      console.log('Game already exists, redirecting to game page');
      return router.createUrlTree(['/game']);
    })
  );
};
