import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersStore } from '../players.store';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css',
})
export class CreatePlayerComponent {
  playerName = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(20),
    Validators.required,
  ]);

  constructor(private playersStore: PlayersStore, private router: Router) {}

  onSubmit() {
    const name = this.playerName.value;
    if (name) {
      this.playersStore.createPlayer(name);
      this.playerName.reset();
      // this.router.navigate(['/']);
    }
  }
}
