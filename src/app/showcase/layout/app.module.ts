import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule, IMAGE_CONFIG } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LoginModule } from "@pages/login/login.module";
import { InputTextModule } from "primeng/inputtext";
import { TabMenuModule } from "primeng/tabmenu";
import { AppMainComponent } from "./app.main.component";
import { AppMenuComponent } from "./menu/app.menu.component";
import { AppTopBarComponent } from "./topbar/app.topbar.component";
// import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { AppRoutingModule, routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { AppMainModule } from "./app.main.module";
import { AvatarGroupModule } from "primeng/avatargroup";
import { AvatarModule } from "primeng/avatar";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { InputIconModule } from "primeng/inputicon";
import { IconFieldModule } from "primeng/iconfield";
import { ButtonModule } from "primeng/button";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';
import { CalendarModule } from 'primeng/calendar';
import { ScrollerModule } from 'primeng/scroller';
@NgModule({
  declarations: [SidebarComponent, AppComponent, AppMainComponent, AppTopBarComponent],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMenuComponent,
    InputTextModule,
    LoginModule,
    TabMenuModule,
    CommonModule,
    AppRoutingModule,
    AvatarModule,
    AvatarGroupModule,
    OverlayPanelModule,
    IconFieldModule,
    InputIconModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    BrowserAnimationsModule,
    CardModule,
    TreeSelectModule,
    CalendarModule,
    ScrollerModule
  ],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}