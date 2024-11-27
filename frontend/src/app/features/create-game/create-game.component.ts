import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../pages/game-page/game.service';

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.css',
})
export class CreateGameComponent {
  onSubmit() {
    this.createGameService.createNewGame();
  }

  constructor(private createGameService: GameService) {}
}
