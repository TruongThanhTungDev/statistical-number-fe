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
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [SidebarComponent, AppComponent],
  imports: [
    // AppRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMainComponent,
    AppTopBarComponent,
    AppMenuComponent,
    InputTextModule,
    LoginModule,
    TabMenuModule,
    CommonModule,
    RouterModule.forRoot(routes)
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