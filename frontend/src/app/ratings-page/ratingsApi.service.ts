import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvgRating } from '../shared/types/types';

@Injectable({
  providedIn: 'root',
})
export class RatingsApiService {
  public getRatings(month?: number) {
    return this.http.get<{ ratings: AvgRating[] }>(
      `http://localhost:5000/api/ratings`
    );
  }

  constructor(private http: HttpClient) {}
}
