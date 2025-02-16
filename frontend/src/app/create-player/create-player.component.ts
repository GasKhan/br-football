import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from '../shared/players.service';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css',
})
export class CreatePlayerComponent {
  playerName = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(20),
    Validators.required,
  ]);

  constructor(private playersService: PlayersService, private router: Router) {}

  onSubmit() {
    const name = this.playerName.value;
    if (name) {
      this.playersService.createPlayer(name);
      this.playerName.reset();
      // this.router.navigate(['/']);
    }
  }
}
