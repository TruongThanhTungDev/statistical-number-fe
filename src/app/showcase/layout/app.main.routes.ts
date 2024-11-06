import { Routes } from "@angular/router";
import { AccountComponent } from "@pages/account/account.component";
import { HomeComponent } from "@pages/home/home.component";
import { StatisticComponent } from "@pages/statistic/statistic.component";
import { ThongKeDanCoDinhComponent } from "@pages/thong-ke-dan-co-dinh/thong-ke-dan-co-dinh.component";
import { ThongKeDanTheoNgayComponent } from "@pages/thong-ke-dan-theo-ngay/thong-ke-dan-theo-ngay.component";

export const AppMainRoutes: Routes = [
  {
    path: 'tra-cuu-dan-dac-biet',
    component: HomeComponent
  },
  {
    path: 'thong-ke-giai-dac-biet',
    component: StatisticComponent
  },
  {
    path: 'quan-ly-tai-khoan',
    component: AccountComponent
  },
  {
    path: 'thong-ke-dan-co-dinh',
    component: ThongKeDanCoDinhComponent
  },
  {
    path: 'thong-ke-dan-theo-ngay',
    component: ThongKeDanTheoNgayComponent
  }
];