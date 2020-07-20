import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  public getloginUser(username: any) {
    return this.http.get(`http://localhost:3000/userdetails/${username}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    });
  }

  public getuserdetails(username: any, updateData: any) {
    return this.http.put(`http://localhost:3000/userdetailsupdate/${username}`, updateData, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public getallusersdetails() {
    return this.http.get(`http://localhost:3000/allusersdetails`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public changepassword(email: any, data: any) {
    return this.http.put(`http://localhost:3000/changepassword/${email}`, data, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public contactus(data: any) {
    return this.http.post(`http://localhost:3000/contact`, data, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

}
