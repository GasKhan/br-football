import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AddPlayerComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
  { path: '', component: MainPageComponent },
];
