import { Routes } from '@angular/router';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { CreateTeamsComponent } from './create-teams/create-teams.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { gamePageResolver } from './game-page/game.resolver';

export const routes: Routes = [
  {
    path: 'admin',
    // resolve: { ratings: adminPageResolver },
    component: AdminPageComponent,
  },
  {
    path: 'create-teams',
    component: CreateTeamsComponent,
  },
  {
    path: 'game',
    component: GamePageComponent,
    resolve: { gameData: gamePageResolver },
  },
  {
    path: 'game/:id',
    component: GamePageComponent,
    resolve: { gameData: gamePageResolver },
  },
  { path: '', component: MainPageComponent },
];
