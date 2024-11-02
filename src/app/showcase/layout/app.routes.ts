import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from '@pages/login/login.component';
import { NgModule } from '@angular/core';
import { UserRouteAccessService } from './user-route-access-service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AppMainComponent,
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('../layout/app.main.module').then((m) => m.AppMainModule)
  },
  { path: '**', redirectTo: '/notfound' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
