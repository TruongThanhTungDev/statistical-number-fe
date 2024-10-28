import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, Renderer2, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigService } from '@service/appconfigservice';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './app.topbar.component.html',
  imports: [CommonModule, FormsModule, StyleClassModule, RouterModule, InputGroupModule, InputGroupAddonModule, InputTextModule, IconFieldModule, InputIconModule, ButtonModule, AvatarModule, AvatarGroupModule, OverlayPanelModule]
})
export class AppTopBarComponent {
  tabActive = 'home';
  listTabs: any[] = [
    {
      name: 'Trang chính',
      key: 'home'
    },
    {
      name: 'Thống kê',
      key: 'dashboard'
    }
  ];
  changeTab(tab: any) {
    this.tabActive = tab;
  }
}
