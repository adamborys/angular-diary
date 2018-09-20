import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private _uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getEntries() {
    return this.http.get(`${this._uri}/entries/${this.authService.getCurrentUserId()}`);
  }

  getEntryById(id) {
    return this.http.get(`${this._uri}/entry/${id}`);
  }

  addEntry(date, activity, mood, remark) {
    const entry = {
      owner: this.authService.getCurrentUserId(),
      date: date,
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this._uri}/entry/add`, entry);
  }

  addEntryDateNow(activity, mood, remark) {
    const entry = {
      owner: this.authService.getCurrentUserId(),
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this._uri}/entry/add`, entry);
  }

  addRecoveredEntry(entry) {
    return this.http.post(`${this._uri}/entry/add`, entry);
  }

  editEntry(id, date, activity, mood, remark) {
    const entry = {
      date: date,
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this._uri}/entry/edit/${id}`, entry);
  }

  removeEntry(id) {
    return this.http.get(`${this._uri}/entry/remove/${id}`);
  }
}
