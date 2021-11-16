import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReq } from 'src/app/models/AuthReq.model';
import { AuthResponse } from 'src/app/models/AuthResponse.model';
import { PasswordEntity } from 'src/app/models/PasswordEntity.model';
import { User } from 'src/app/models/user.model';
import { Users } from 'users.model';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { 

  }
  saveUser(user: User) {
    return this.http.post(Constants.userServiceUrl+"save", user);
  }
  validateUser(authReq: AuthReq) {
    return this.http.post<AuthResponse>(Constants.userServiceUrl+"user-validate/", authReq);
  }
  validateHint(email:string,question:string,ans:string){
    return this.http.get(Constants.userServiceUrl+`hint/${email}/${question}/${ans}`);
  }
  getUser(userName: string) {
 
    return this.http.get<User>(Constants.userServiceUrl+`get`,{
      headers: {'Authorization':userName}
    });
  }
  getUserDetails(userName:string){
    return this.http.get<Users>(Constants.userServiceUrl+`get`,{
      headers: {'Authorization':userName}
    });
  }
  updateUser(passwordEntity:PasswordEntity) {
    return this.http.put<User>(Constants.userServiceUrl+`update`, passwordEntity);
  }
  updateAccountDetails(userName: string, user: User) {
    return this.http.put<User>(Constants.userServiceUrl+`updateAccount`, user,{
      headers: {'Authorization': userName}
    });
  }
  getUserWalletAmount(userName:string) {
    return this.http.get(Constants.userServiceUrl+`wallet`,{
      headers: {'Authorization': userName}
    });
  }
}
