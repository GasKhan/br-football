import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PlayersService } from './playersApi.service';
import { Rating } from '../shared/types/types';

export const playersPageResolver: ResolveFn<Rating[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const playersService = inject(PlayersService);
  return playersService.getRatings().pipe(tap((r) => console.log(r)));
};
