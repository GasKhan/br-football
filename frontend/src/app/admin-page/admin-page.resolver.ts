import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PlayersService, Rating } from '../../../shared/players.service';

export const adminPageResolver: ResolveFn<Rating[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const playersService = inject(PlayersService);
  return playersService.getRatings().pipe(tap((r) => console.log(r)));
};
