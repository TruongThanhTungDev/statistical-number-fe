import { HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiServices } from "@layout/api.services";
import { ToastService } from "src/app/showcase/utils/toast.service";

@Component({
  selector: 'cap-nhat-mat-khau',
  templateUrl: './cap-nhat-mat-khau.component.html'
})
export class CapNhatMatKhauComponent {
  @Output() reLoadData = new EventEmitter<any>();
  @Input() listUser: any
  visible = false;
  oldPassword: any
  password: any;
  repassword: any;
  REQUEST_URL = 'api/v1/user';
  isLoading = false
  get checkPassword() {
    return this.repassword && this.password && this.repassword !== this.password;
  }
  constructor(
    private apiService: ApiServices,
    private toast: ToastService
  ) {
    
  }
  save() {
    if (!this.oldPassword) {
      this.toast.warning('Vui lòng nhật mật khẩu cũ')
      return
    }
    if (!this.password) {
      this.toast.warning('Vui lòng nhật mật khẩu mới');
      return;
    }
    if (this.checkPassword) {
      return
    }
    this.isLoading = true
    const payload = {
      userId: this.listUser[0].id,
      oldPassword: this.oldPassword,
      newPassword: this.password
    };
    this.apiService.postOption(this.REQUEST_URL, payload, '/change-password').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false
          this.toast.success('Đổi mật khẩu thành công')
          this.closeModal()
        } else {
          this.isLoading = false
          this.toast.error(res.body.result);
        }
      },
      () => {
        this.isLoading = false
      }
    )
  }
  showDialog() {
    this.visible = true
    console.log('this.listUser :>> ', this.listUser);
  }
  closeModal() {
    this.oldPassword = ''
    this.password = '';
    this.repassword = '';
    this.visible = false;
    this.reLoadData.emit();
  }
}