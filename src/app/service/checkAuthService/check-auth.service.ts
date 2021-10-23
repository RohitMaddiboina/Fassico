import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  constructor() { }
  isUserLoggedIn(): boolean{
    if(sessionStorage.getItem('token')!=null){
      return true;
    }
    return false;
  }

  getToken(): string | null{
    let token = sessionStorage.getItem('token');
    return token;
  }
  logout(): void{
    sessionStorage.removeItem('token');
  }
}
