import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppTopBarComponent } from "./topbar/app.topbar.component";
import { StyleClassModule } from "primeng/styleclass";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { RouterModule } from "@angular/router";
import { AppMainRoutes } from "./app.main.routes";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HomeComponent } from "@pages/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { ScrollerModule } from "primeng/scroller";
import { TreeSelectModule } from "primeng/treeselect";
import { StatisticComponent } from "@pages/statistic/statistic.component";
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AccountComponent } from "@pages/account/account.component";
import { ThongKeDanCoDinhComponent } from "@pages/thong-ke-dan-co-dinh/thong-ke-dan-co-dinh.component";
import { PaginatorModule } from 'primeng/paginator';
import { ThongKeDanTheoNgayComponent } from "@pages/thong-ke-dan-theo-ngay/thong-ke-dan-theo-ngay.component";
import { ThemSuaTaiKhoanComponent } from "../shared/popup/them-sua-tai-khoan/them-sua-tai-khoan.component";
import { DialogModule } from "primeng/dialog";
import { CapNhatMatKhauComponent } from "../shared/popup/cap-nhat-mat-khau/cap-nhat-mat-khau.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { SidebarModule } from 'primeng/sidebar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ThongKeGiaiDacBietTheoBoComponent } from "@pages/thong-ke-giai-dac-biet-theo-bo/thong-ke-giai-dac-biet-theo-bo.component";
import { XemKetQuaPopup } from "../shared/popup/xem-ket-qua/xem-ket-qua.component";
import { ThongKeGiaiTheoBoCapComponent } from "@pages/thong-ke-giai-theo-bo-cap/thong-ke-giai-theo-bo-cap.component";
import { ThongKeGiaiTheoTuanComponent } from "@pages/thong-ke-giai-theo-tuan/thong-ke-giai-theo-tuan.component";
import { TraCuuDanDacBietLotoComponent } from "@pages/tra-cuu-dan-dac-biet-loto/tra-cuu-dan-dac-biet-loto.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StyleClassModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    RouterModule.forChild(AppMainRoutes),
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    // BrowserAnimationsModule,
    CardModule,
    TreeSelectModule,
    CalendarModule,
    ScrollerModule,
    SkeletonModule,
    ProgressSpinnerModule,
    RippleModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    SidebarModule,
    ToggleButtonModule,
    CheckboxModule,
    InputTextareaModule
  ],
  declarations: [HomeComponent, StatisticComponent, AccountComponent, ThongKeDanCoDinhComponent, ThongKeDanTheoNgayComponent, ThemSuaTaiKhoanComponent, CapNhatMatKhauComponent, ThongKeGiaiDacBietTheoBoComponent, ThongKeGiaiTheoBoCapComponent, ThongKeGiaiTheoTuanComponent, TraCuuDanDacBietLotoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppMainModule {}