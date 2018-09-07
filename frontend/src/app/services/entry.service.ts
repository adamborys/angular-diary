import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private _uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getEntries() {
    return this.http.get(`${this._uri}/entries`);
  }

  getEntryById(id) {
    return this.http.get(`${this._uri}/entries/${id}`);
  }

  addEntry(date, activity, mood, remark) {
    const entry = {
      date: date,
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this._uri}/entries/add`, entry);
  }

  addEntryDateNow(activity, mood, remark) {
    const entry = {
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this._uri}/entries/add`, entry);
  }

  addRecoveredEntry(entry) {
    return this.http.post(`${this._uri}/entries/add`, entry);
  }

  editEntry(id, date, activity, mood, remark) {
    const entry = {
      date: date,
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this._uri}/entries/edit/${id}`, entry);
  }

  removeEntry(id) {
    return this.http.get(`${this._uri}/entries/remove/${id}`);
  }
}
