import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface TokenResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {


  private token: string;

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails() {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return true
    } else {
      return false
    }
  }


  constructor(private http: HttpClient, private router: Router) { }

  public register(user: any): Observable<Object> {
    return this.http.post(`http://localhost:3000/createaccount`, user);
  }

  public login(userlogin) {
    const base = this.http.post(`http://localhost:3000/login`, userlogin);

    const request = base.pipe(
      map((userlogin: TokenResponse) => {

        if (userlogin.token) {
          this.saveToken(userlogin.token);
        }
        return userlogin

      }
      )
    )

    return request;

  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/signin')
  }

}
