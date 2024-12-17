import { Routes } from "@angular/router";
import { AccountComponent } from "@pages/account/account.component";
import { HomeComponent } from "@pages/home/home.component";
import { StatisticComponent } from "@pages/statistic/statistic.component";
import { ThongKeDanCoDinhComponent } from "@pages/thong-ke-dan-co-dinh/thong-ke-dan-co-dinh.component";
import { ThongKeDanTheoNgayComponent } from "@pages/thong-ke-dan-theo-ngay/thong-ke-dan-theo-ngay.component";
import { ThongKeGiaiDacBietTheoBoComponent } from "@pages/thong-ke-giai-dac-biet-theo-bo/thong-ke-giai-dac-biet-theo-bo.component";
import { ThongKeGiaiTheoBoCapComponent } from "@pages/thong-ke-giai-theo-bo-cap/thong-ke-giai-theo-bo-cap.component";
import { ThongKeGiaiTheoTuanComponent } from "@pages/thong-ke-giai-theo-tuan/thong-ke-giai-theo-tuan.component";
import { TraCuuDanDacBietLotoComponent } from "@pages/tra-cuu-dan-dac-biet-loto/tra-cuu-dan-dac-biet-loto.component";

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
  },
  // {
  //   path: 'thong-ke-giai-dac-biet-theo-tuan',
  //   component: ThongKeGiaiDacBietTheoBoComponent
  // }
  {
    path: 'thong-ke-giai-loto-theo-bo',
    component: ThongKeGiaiDacBietTheoBoComponent
  },
  {
    path: 'thong-ke-giai-loto-theo-bo-cap',
    component: ThongKeGiaiTheoBoCapComponent
  },
  {
    path: 'thong-ke-giai-theo-tuan',
    component: ThongKeGiaiTheoTuanComponent
  },
  {
    path: 'tra-cuu-dan-dac-biet-loto',
    component: TraCuuDanDacBietLotoComponent
  }
];