import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getEntries() {
    return this.http.get(`${this.uri}/entries`);
  }

  getEntryById(id) {
    return this.http.get(`${this.uri}/entries/${id}`);
  }

  addEntry(date, activity, mood, remark) {
    const entry = {
      date: date,
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this.uri}/entries/add`, entry);
  }

  addEntryDateNow(activity, mood, remark) {
    const entry = {
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this.uri}/entries/add`, entry);
  }

  addRecoveredEntry(entry) {
    const recoveredEntry = {
      date: entry.date,
      activity: entry.activity,
      mood: entry.mood,
      remark: entry.remark
    };
    return this.http.post(`${this.uri}/entries/add`, recoveredEntry);
  }

  editEntry(id, date, activity, mood, remark) {
    const entry = {
      date: date,
      activity: activity,
      mood: mood,
      remark: remark
    };
    return this.http.post(`${this.uri}/entries/edit/${id}`, entry);
  }

  removeEntry(id) {
    return this.http.get(`${this.uri}/entries/remove/${id}`);
  }
}
