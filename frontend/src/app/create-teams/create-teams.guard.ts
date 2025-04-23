import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, take } from 'rxjs/operators';
import { GameApiService } from '../game-page/gameApi.service';
import { of } from 'rxjs';

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
      if (!game) {
        console.log('No game data found, allowing access to create teams page');
        return true;
      }
      console.log('Game already exists, redirecting to game page');
      return router.createUrlTree(['/game']);
    }),
    catchError((err) => {
      console.error('Error fetching game data', err);
      return of(true);
    })
  );
};
