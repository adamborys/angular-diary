import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  registerUser(email, password) {
    const user = {
      email: email,
      password: password
    };
    return this.http.post(`${this._uri}/users/register`, user);
  }

  loginUser(email, password) {
    const user = {
      email: email,
      password: password
    };
    return this.http.post(`${this._uri}/users/login`, user);
  }
}
