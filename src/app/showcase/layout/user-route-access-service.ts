import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    // const authorities = route.data['authorities'];
    // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
    // that the client has a principal too, if they already logged in by the server.
    // This could happen on a page refresh.
    const isAuthen = this.checkLogin();
    if (isAuthen === false) this.router.navigate(["/login"]);
    return isAuthen;
  }

  checkLogin(): boolean {
    const token = localStorage.getItem('token')
    if (!token) return false;
    return true;
  }
}
