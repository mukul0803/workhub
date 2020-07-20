import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  //Admin

  public createtask(task: any): Observable<Object> {
    return this.http.post(`http://localhost:3000/createtask`, task, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    });
  }

  public gettask() {
    return this.http.get(`http://localhost:3000/alltasks`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public getpendingtask() {
    return this.http.get(`http://localhost:3000/taskspending`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public getcompletedtask() {
    return this.http.get(`http://localhost:3000/taskscompleted`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public adminTaskUpdate(id: any, data: any) {
    return this.http.put(`http://localhost:3000/admintaskupdate/${id}`, data, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  //User

  public getusertask(username: any) {
    return this.http.get(`http://localhost:3000/usertasks/${username}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  };

  public getuserpending(username: any) {
    return this.http.get(`http://localhost:3000/usertaskspending/${username}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  };

  public getusercompleted(username: any) {
    return this.http.get(`http://localhost:3000/usertaskscompleted/${username}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  };

  public gettaskdetails(id: any) {
    return this.http.get(`http://localhost:3000/taskdetail/${id}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public userTaskUpdate(id: any, status: any) {
    return this.http.put(`http://localhost:3000/usertaskupdate/${id}`, status, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public UpdateChat(id: any, fullname: any, comment: any) {
    return this.http.put(`http://localhost:3000/chat/${id}/${fullname}`, comment, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  public getChat(id: any) {
    return this.http.get(`http://localhost:3000/getchat/${id}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }


}
