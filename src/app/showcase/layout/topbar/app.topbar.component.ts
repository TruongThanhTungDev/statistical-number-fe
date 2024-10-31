import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, Renderer2, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
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
