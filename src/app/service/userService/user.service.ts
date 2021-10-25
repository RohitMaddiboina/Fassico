import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReq } from 'src/app/models/AuthReq.model';
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
    return this.http.post("http://localhost:8080/fasscio/user-validate/", authReq);
  }
  getUser(email: String | null) {
    return this.http.get<User>(`http://localhost:8080/fasscio/get/${email}`);
  }
  updateUser(email: String, user: User) {
    return this.http.put<User>(`http://localhost:8080/fasscio/update/${email}`, user);
  }
  updateAccountDetails(email: String, user: User) {
    return this.http.put<User>(`http://localhost:8080/fasscio/updateAccount/${email}`, user);
  }
}
