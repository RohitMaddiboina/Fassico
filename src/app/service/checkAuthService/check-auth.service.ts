import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  TOKEN_STRING  = "Authorization";
  constructor() { }
  isUserLoggedIn(): boolean{
    if(sessionStorage.getItem(this.TOKEN_STRING)!=null){
      return true;
    }
    return false;
  }

  setToken(token:string){
    sessionStorage.setItem(this.TOKEN_STRING,'Bearer '+token);
  }
  getToken(): string{
    let token = sessionStorage.getItem(this.TOKEN_STRING);
    if(token!=null){

      return token;
    }
    return '';
  }
  logout(): void{
    sessionStorage.removeItem(this.TOKEN_STRING);
  }
}
