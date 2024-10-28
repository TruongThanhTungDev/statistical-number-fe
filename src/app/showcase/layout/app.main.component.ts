import { CommonModule, DOCUMENT, IMAGE_CONFIG } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { AppConfigService } from '@service/appconfigservice';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';

@Component({
    selector: 'app-main',
    template: `
        <div class="layout-wrapper p-4">
            <app-topbar></app-topbar>
            <div class="layout-content">
                <div class="layout-content-slot">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    standalone: true,
    imports: [RouterOutlet, CommonModule, AppMenuComponent, AppTopBarComponent]
})
export class AppMainComponent {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private configService: AppConfigService
    ) {}
}
