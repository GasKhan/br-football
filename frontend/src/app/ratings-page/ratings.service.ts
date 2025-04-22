import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { AvgRating } from '../shared/types/types';
import { RatingsApiService } from './ratingsApi.service';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  private ratings = new BehaviorSubject<{ ratings: AvgRating[] }>({
    ratings: [],
  });
  public ratings$ = this.ratings.asObservable();

  public getRatings() {
    this.ratingsApiService
      .getRatings()
      .pipe(take(1))
      .subscribe((data) => {
        this.ratings.next(data);
      });
  }

  constructor(private ratingsApiService: RatingsApiService) {}
}
