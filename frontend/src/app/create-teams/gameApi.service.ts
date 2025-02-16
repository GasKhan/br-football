import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../shared/types/types';

@Injectable({ providedIn: 'root' })
export class GameApiService {
  saveTeams(teams: Team[]) {
    console.log(teams);
    return this.http.post('http://localhost:5000/api/games', { teams });
  }

  constructor(private http: HttpClient) {}
}
