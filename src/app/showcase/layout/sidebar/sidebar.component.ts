import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
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
      key: 'tra-cuu-dan-dac-biet',
      path: '/tra-cuu-dan-dac-biet',
      name: 'Tra cứu dàn đặc biệt',
      icon: 'pi pi-search'
    }
  ];
  menuActive = 'thong-ke-giai-dac-biet';
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const clearUrl = event.url.split('/')[1].split("?")[0]
      if (clearUrl) {
        this.menuActive = clearUrl
      } else {
        this.router.navigate(['/thong-ke-giai-dac-biet']);
      }
    });
  }
  toMenu(menu: any) {
    this.router.navigate([menu.path])
    this.menuActive = menu.key
  }
}