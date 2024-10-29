import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from '@pages/login/login.component';
import { NgModule } from '@angular/core';

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
// @NgModule({
//   imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
