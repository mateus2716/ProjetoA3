import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ApiRoutes = {
  login: 'login',
  signup: 'signup',
  users: 'users'
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private Url: string =  'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public login(user: any) {
    let url = `${this.Url}/${ApiRoutes.login}`;

    return this.http.post(url, JSON.stringify(user), this.loadHeaders());
  }

  private loadHeaders(token: string = '') {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `${token}`
    })

    return { headers };
  }
}
