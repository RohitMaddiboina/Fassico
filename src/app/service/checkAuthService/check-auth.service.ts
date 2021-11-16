import { Injectable } from '@angular/core';
import { CartCountService } from '../CartCountShareServiec/cart-count.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  TOKEN_STRING  = "Authorization";
  constructor(public cartCountService:CartCountService) { }
  isUserLoggedIn(): boolean{
    if(localStorage.getItem(this.TOKEN_STRING)!=null){
      return true;
    }
    return false;
  }

  setToken(token:string){
  
    localStorage.setItem(this.TOKEN_STRING,'Bearer '+token);
    
  }
  getToken(): string{
    let token = localStorage.getItem(this.TOKEN_STRING);
    if(token!=null){

      return token;
    }
    return '';
  }
  logout(): void{
    this.cartCountService.changeMessage('0');
    localStorage.removeItem(this.TOKEN_STRING);

  }
}
