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

  getToken() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      return JSON.parse(atob(token.split('.')[1]));
    }
  }

  isLoggedIn() {
    const token = this.getToken();
    if (token !== null && token.exp * 1000 > Date.now()) {
      return true;
    }
    return false;
  }

  getCurrentUserId() {
    const token = this.getToken();
    if (token !== null && token.exp * 1000 > Date.now()) {
      return token._id;
    }
  }
}
