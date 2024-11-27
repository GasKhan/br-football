import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PlayersService } from '../../shared/services/players.service';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css',
})
export class AddPlayerComponent implements OnInit {
  playerForm = new FormGroup({
    playerName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.required,
    ]),
  });

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {}
  constructor(private playersService: PlayersService, private router: Router) {}

  onSubmit() {
    const name = this.playerForm.controls.playerName.value;
    if (name) {
      this.playersService.createPlayer(name);
      // this.router.navigate(['/']);
    }
  }
}
