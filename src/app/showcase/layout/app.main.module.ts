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
  ],
  declarations: [HomeComponent, StatisticComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppMainModule {}