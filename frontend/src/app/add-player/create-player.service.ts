import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CreatePlayerService {
  constructor(private http: HttpClient) {}
  createPlayer(playerName: string) {
    this.http
      .post('http://localhost:5000/api/players', { playerName })
      .subscribe((res) => console.log(res));
  }
}
