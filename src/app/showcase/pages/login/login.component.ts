import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiServices } from "@layout/api.services";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  username: any
  password: any
  REQUEST_URL = 'api/v1/user/login'
  constructor(
    private apiService: ApiServices,
    private router: Router, 
  ) {}
  ngOnInit(): void {
    localStorage.clear();
  }
  login() {
    const entity = {
      username: this.username,
      password: this.password,
    };
    this.apiService.postOption(this.REQUEST_URL, entity, '').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body.code === 200) {
          localStorage.setItem('token', res.body.result.token);
          this.router.navigate(['/'])
        }
      },
      (err) => {
        console.log(err);
        console.error();
      }
    );
  }
}