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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StyleClassModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    RouterModule.forChild(AppMainRoutes)
  ],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppMainModule {}