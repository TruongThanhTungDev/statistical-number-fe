import { Routes } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from '@pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: '',
    component: AppMainComponent,
    children: []
  },
  { path: '**', redirectTo: '/notfound' }
];
