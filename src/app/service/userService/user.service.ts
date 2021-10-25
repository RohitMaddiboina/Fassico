import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReq } from 'src/app/models/AuthReq.model';
import { AuthResponse } from 'src/app/models/AuthResponse.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { 

  }
  saveUser(user: User) {
    return this.http.post("http://localhost:8080/fasscio/save", user);
  }
  validateUser(authReq: AuthReq) {
    return this.http.post<AuthResponse>("http://localhost:8080/fasscio/user-validate/", authReq);
  }
  getUser(userName: string) {
 
    return this.http.get<User>(`http://localhost:8080/fasscio/get`,{
      headers: {'Authorization':userName}
    });
  }
  updateUser(userName: string, user: User) {
    return this.http.put<User>(`http://localhost:8080/fasscio/update`, user,{
      headers: {'Authorization': userName}
    });
  }
  updateAccountDetails(userName: string, user: User) {
    return this.http.put<User>(`http://localhost:8080/fasscio/updateAccount`, user,{
      headers: {'Authorization': userName}
    });
  }
}
