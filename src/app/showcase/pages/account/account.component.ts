import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiServices } from '@layout/api.services';
import { ToastService } from '../../utils/toast.service';
import { ConfirmationService } from 'primeng/api';
import { OPERATIONS } from '@layout/app.constants';
import { Plugins } from '../../utils/plugins';

@Component({
  selector: 'account-component',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  listData: any[] = [];
  itemsPerPage = 10;
  scrollHeight: string = '';
  REQUEST_URL = 'api/v1/user';
  isShowUpdatePassword = false;
  plugins = new Plugins();
  selectedItems: any[] = [];
  constructor(
    private apiService: ApiServices,
    private toast: ToastService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.onResize();
    this.getData();
  }
  getData() {
    const params = {
      page: 0,
      size: 99999,
      filter: 'id>0',
      sort: ['id', 'desc']
    };
    this.apiService.getOption(this.REQUEST_URL, params, '/search').subscribe((res: HttpResponse<any>) => {
      if (res.body.code === 200) {
        this.listData = res.body.result.content;
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calculateScrollHeight();
  }
  changeRowTable(event: any) {
    this.itemsPerPage = event;
  }
  private calculateScrollHeight(): void {
    const fixedHeight = 78 + 206;
    const viewportHeight = window.innerHeight;
    const calculatedHeight = viewportHeight - fixedHeight;
    this.scrollHeight = `${calculatedHeight}px`;
  }
  reloadData() {
    this.getData();
    this.isShowUpdatePassword = false
  }
  deleteAccount() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Bạn chắc chắn muốn xóa ${this.selectedItems && this.selectedItems.length > 1 ? 'những' : ''} bản ghi này không?`,
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: async () => {
        await this.handleDeleteAccount();
        setTimeout(() => {
          this.toast.success('Xóa thành công');
          this.getData();
          this.selectedItems = [];
        }, 1000);
      },
      reject: () => {}
    });
  }
  async handleDeleteAccount() {
    this.selectedItems.forEach(async (item) => {
      await this.apiService.delete(this.REQUEST_URL + OPERATIONS.DELETE, item.id).subscribe((res: HttpResponse<any>) => {
        if (res.body.code == 200) {
        }
      });
    });
    this.getData();
  }
  lockAccount() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bạn chắc chắn muốn khóa tài khoản này?',
      header: 'Xác nhận Khóa',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: async () => {
        this.apiService.get(this.REQUEST_URL + '/lock?id=' + this.selectedItems[0].id).subscribe((res: HttpResponse<any>) => {
          if (res.body.code === 200) {
            this.toast.success('Đã khóa tài khoản');
            this.getData();
            this.selectedItems = [];
          }
        });
      },
      reject: () => {}
    });
  }
  unlockAccount() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bạn chắc chắn muốn khóa tài khoản này?',
      header: 'Xác nhận Khóa',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: async () => {
        this.apiService.get(this.REQUEST_URL + '/unlock?id=' + this.selectedItems[0].id).subscribe((res: HttpResponse<any>) => {
          if (res.body.code === 200) {
            this.toast.success('Đã khóa tài khoản');
            this.getData();
            this.selectedItems = [];
          }
        });
      },
      reject: () => {}
    });
  }
  selecteItem(item: any) {
    this.selectedItems = [item];
  }
  showDialogUpdatePassword() {
    this.isShowUpdatePassword = !this.isShowUpdatePassword
  }
}
