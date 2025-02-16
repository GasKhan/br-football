import { Routes } from '@angular/router';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { CreateTeamsComponent } from './create-teams/create-teams.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: 'admin',
    // resolve: { ratings: adminPageResolver },
    component: AdminPageComponent,
  },
  {
    path: 'game',
    component: CreateTeamsComponent,
  },
  { path: '', component: MainPageComponent },
];
