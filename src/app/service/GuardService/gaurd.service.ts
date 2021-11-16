import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CheckAuthService } from '../checkAuthService/check-auth.service';


@Injectable({
  providedIn: 'root'
})
export class GaurdService implements CanActivate {

  constructor(private router: Router, public checkAuthService: CheckAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.checkAuthService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login'], { queryParams: { 'redirectURL': state.url } });
      return false;
    }
  }
}
