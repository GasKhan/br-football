import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../shared/types/types';

const GAMES_ROUTE = 'http://localhost:5000/api/games';

@Injectable({ providedIn: 'root' })
export class TeamApiService {
  saveTeams(teams: Team[]) {
    return this.http.post(GAMES_ROUTE, { teams });
  }

  constructor(private http: HttpClient) {}
}
