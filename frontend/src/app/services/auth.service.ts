import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  findUser(email) {
    return this.http.get(`${this._uri}/users/find/${email}`, {observe: 'response'});
  }

  registerUser(email, password) {
    const user = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this._uri}/users/register`, user, {observe: 'response'});
  }

  loginUser(email, password) {
    const user = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this._uri}/users/login`, user, {observe: 'response'});
  }
}
