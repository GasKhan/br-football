import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import {
  PlayersService,
  Rating,
} from '../../../shared/services/players.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

export const adminPageResolver: ResolveFn<Rating[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const playersService = inject(PlayersService);
  return playersService.getRatings().pipe(tap((r) => console.log(r)));
};
