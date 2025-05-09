import { Routes } from '@angular/router';

import { CreateTeamsComponent } from './create-teams/create-teams.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { gamePageResolver } from './game-page/game.resolver';
import { PlayersPageComponent } from './players-page/players-page.component';
import { createTeamsGuard } from './create-teams/create-teams.guard';
import { RatingsPageComponent } from './ratings-page/ratings-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'players',
    // resolve: { ratings: adminPageResolver },
    component: PlayersPageComponent,
  },
  {
    path: 'create-teams',
    component: CreateTeamsComponent,
    canActivate: [createTeamsGuard],
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
  { path: 'ratings', component: RatingsPageComponent },
  { path: '', component: MainPageComponent },
  { path: '**', component: NotFoundComponent },
];
