import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2, afterNextRender } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit {
  tabActive = 'home';
  headerTitle = '';
  listMenu: any[] = [
    {
      key: 'quan-ly-tai-khoan',
      path: '/quan-ly-tai-khoan',
      name: 'Quản lý tài khoản',
      icon: 'pi pi-users'
    },
    {
      key: 'thong-ke-giai-dac-biet',
      path: '/thong-ke-giai-dac-biet',
      name: 'Thống kê giải đặc biệt',
      icon: 'pi pi-star'
    },
    {
      key: 'thong-ke-dan-co-dinh',
      path: '/thong-ke-dan-co-dinh',
      name: 'Thống kê dàn cố định',
      icon: 'pi pi-database'
    },
    {
      key: 'thong-ke-dan-theo-ngay',
      path: '/thong-ke-dan-theo-ngay',
      name: 'Thống kê dàn theo ngày',
      icon: 'pi pi-table'
    },
    {
      key: 'thong-ke-giai-theo-tuan',
      path: '/thong-ke-giai-theo-tuan',
      name: 'Thống kê giải đặc biệt theo tuần',
      icon: 'pi pi-calendar-clock'
    },
    {
      key: 'thong-ke-giai-loto-theo-bo-cap',
      path: '/thong-ke-giai-loto-theo-bo-cap',
      name: 'Thống kê giải Loto theo bộ cặp',
      icon: 'pi pi-objects-column'
    },
    {
      key: 'tra-cuu-dan-dac-biet',
      path: '/tra-cuu-dan-dac-biet',
      name: 'Tra cứu dàn đặc biệt',
      icon: 'pi pi-search'
    },
    {
      key: 'tra-cuu-dan-dac-biet-loto',
      path: '/tra-cuu-dan-dac-biet-loto',
      name: 'Tra cứu dàn đặc biệt Loto',
      icon: 'pi pi-search-plus'
    }
  ];
  screenWidth: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportRuler: ViewportRuler
  ) {
    const url = this.router.url.split('/')[1];
    if (!url) {
      this.headerTitle = 'Thống kê giải đặc biệt';
    } else {
      const page = this.listMenu.find((item) => item.key === url);
      if (page) {
        this.headerTitle = page.name;
      } else {
        this.headerTitle = 'Thống kê giải đặc biệt';
      }
    }
    console.log('this.router.url :>> ', this.router.url);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const clearUrl = event.url.split('/')[1];
      if (clearUrl === '') {
        this.headerTitle = 'Thống kê giải đặc biệt';
      } else {
        const page = this.listMenu.find((item) => item.key === clearUrl);
        if (page) {
          this.headerTitle = page.name;
        } else {
          this.headerTitle = 'Thống kê giải đặc biệt';
        }
      }
    });
  }
  ngOnInit(): void {
    this.screenWidth = this.viewportRuler.getViewportSize().width;

    // Subscribe to viewport change
    this.viewportRuler.change().subscribe(() => {
      this.screenWidth = this.viewportRuler.getViewportSize().width;
    });
  }
  changeTab(tab: any) {
    this.tabActive = tab.key;
    this.router.navigate([tab.path]);
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
