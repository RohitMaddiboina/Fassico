import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckAuthService } from '../checkAuthService/check-auth.service';


@Injectable({
  providedIn: 'root'
})
export class GaurdService  implements CanActivate{

  constructor(private router: Router,public checkAuthService: CheckAuthService ) { }

  canActivate(): boolean {
    if(this.checkAuthService.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
}
