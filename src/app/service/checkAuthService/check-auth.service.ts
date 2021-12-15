import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartCountService } from '../CartCountShareServiec/cart-count.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  TOKEN_STRING  = "Authorization";
  constructor(public cartCountService:CartCountService,private http: HttpClient) { }
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
    this.remove();

  }
  remove(){
    
    let image:Blob = new Blob();
    this.http.get('assets/img/NoProfilePic.jpg', { responseType: 'blob' }).subscribe(data => {
      let file =  new FileReader();
      file.readAsDataURL(data);
      let objectURL = 'data:image/jpeg;base64,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' 
      localStorage.setItem('profilePicture',objectURL);
      
      
    });
  
  }
}
