import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, Renderer2, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  tabActive = 'home';
  listTabs: any[] = [
    {
      name: 'Trang chính',
      key: 'home',
      path: ''
    },
    {
      name: 'Thống kê',
      key: 'statistic',
      path: '/statistic'
    }
  ];
  constructor(
    private router: Router
  ) {}
  changeTab(tab: any) {
    this.tabActive = tab.key;
    this.router.navigate([tab.path])
  }
}
