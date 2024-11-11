import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiServices } from "@layout/api.services";
import { ToastService } from "../../utils/toast.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit{
  username: any
  password: any
  REQUEST_URL = 'api/v1/user/login'
  isLoading = false
  constructor(
    private apiService: ApiServices,
    private router: Router, 
    private toast: ToastService
  ) {}
  ngOnInit(): void {
    localStorage.clear();
  }
  login() {
    if (!this.username) {
      this.toast.warning('Vui lòng nhập Tên đăng nhập')
      return
    }
    if (!this.password) {
      this.toast.warning('Vui lòng nhập Mật khẩu')
      return
    }
    this.isLoading = true
    const entity = {
      username: this.username,
      password: this.password,
    };
    this.apiService.postOption(this.REQUEST_URL, entity, '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          this.isLoading = false
          localStorage.setItem('token', res.body.result.token);
          this.toast.success('Đăng nhập thành công')
          this.router.navigate(['/thong-ke-giai-dac-biet']);
        } else {
          this.isLoading = false;
          this.toast.error(res.body.message);
        }
      },
      (err) => {
        console.log(err);
        console.error();
      }
    );
  }
}