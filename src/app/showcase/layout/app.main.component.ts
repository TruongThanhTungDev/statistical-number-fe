import { CommonModule, DOCUMENT, IMAGE_CONFIG } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { AppConfigService } from '@service/appconfigservice';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppModule } from './app.module';

@Component({
  selector: 'app-main',
  templateUrl: './app.main.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AppMenuComponent, AppTopBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppMainComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private configService: AppConfigService
  ) {}
}
