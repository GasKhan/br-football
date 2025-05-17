import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvgRating } from '../shared/types/types';

const RATINGS_ROUTE = `http://localhost:5000/api/ratings`;

@Injectable({
  providedIn: 'root',
})
export class RatingsApiService {
  public getRatings(month?: number) {
    return this.http.get<{ ratings: AvgRating[] }>(RATINGS_ROUTE);
  }

  constructor(private http: HttpClient) {}
}
