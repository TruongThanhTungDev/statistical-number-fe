import { HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { ApiServices } from "@layout/api.services";
import { ToastService } from "src/app/showcase/utils/toast.service";

@Component({
  selector: 'them-sua-tai-khoan',
  templateUrl: './them-sua-tai-khoan.component.html'
})
export class ThemSuaTaiKhoanComponent {
  @Output() reLoadData = new EventEmitter<any>()
  visible: boolean = false;
  username: any
  fullName: any
  password: any
  repassword: any
  email: any
  address: any
  phone: any
  REQUEST_URL = 'api/v1/user'
  isLoading = false
  constructor(
    private apiService: ApiServices,
    private toast: ToastService
  ) {
    
  }
  get checkPassword() {
    return this.repassword && this.password && this.repassword !== this.password
  }
  showDialog() {
    this.visible = true;
  }
  save() {
    if (!this.username) {
      this.toast.warning('Vui lòng nhập Tên đăng nhập')
      return
    }
    if (!this.fullName) {
      this.toast.warning('Vui lòng nhập Họ tên');
      return;
    }
    if (!this.password) {
      this.toast.warning('Vui lòng nhập Mật khẩu');
      return;
    }
    if (this.checkPassword) {
      return;
    }
    this.isLoading = true
    const payload = {
      username: this.username,
      fullName: this.fullName,
      password: this.password,
      phone: this.phone,
      email: this.email,
      address: this.address
    }
    this.apiService.postOption(this.REQUEST_URL, payload, '/create').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.toast.success('Thêm mới tài khoản thành công!')
          this.isLoading = false;
          this.closeModal()
        } else {
          this.isLoading = false
          this.toast.error('Thêm mới tài khoản thất bại!');
        }
      }
    )
  }
  closeModal() {
    this.username = ''
    this.fullName = ''
    this.password = ''
    this.repassword = ''
    this.email = ''
    this.address = ''
    this.phone = ''
    this.visible = false
    this.reLoadData.emit()
  }
}