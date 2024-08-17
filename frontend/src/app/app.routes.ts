import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AddPlayerComponent } from './add-player/add-player.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AddPlayerComponent,
  },
  { path: '', component: MainPageComponent },
];
