import { Routes } from "@angular/router";
import { HomeComponent } from "@pages/home/home.component";
import { StatisticComponent } from "@pages/statistic/statistic.component";

export const AppMainRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'statistic',
    component: StatisticComponent
  }
]