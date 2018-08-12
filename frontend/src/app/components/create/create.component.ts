import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import MY_FORMATS from '../../globals';

import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private entryService: EntryService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      time: ['', Validators.required],
      date: ['', Validators.required],
      activity: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      mood: ['', Validators.required],
      remark: ''
    });
  }

  ngOnInit() {
    const now = moment();
    this.createForm.patchValue({
      time: now.format('HH:mm'),
      date: now
    });
  }

  setMinutes(time: string, minutes: string) {
    const timeInput = time.split(':');
    const hour = timeInput[0];
    this.createForm.patchValue({
      time: hour + ':' + minutes
    });
    this.createForm.markAsDirty();
  }

  setDay(date: string, value: moment.DurationInputArg1) {
    const dayDate = moment(date, 'DD/MM/YYYY');
    dayDate.add(value, 'days');
    this.createForm.patchValue({
      date: dayDate.toDate()
    });
    this.createForm.markAsDirty();
  }

  addEntry(time: string, date: Date, activity: String, mood: Number, remark: String) {
    const timeInput = time.split(':');
    // tslint:disable-next-line:prefer-const
    let timeDate = moment(date, 'DD/MM/YYYY HH:mm');
    timeDate.add(timeInput[0], 'hours');
    timeDate.add(timeInput[1], 'minutes');
    this.entryService.addEntry(timeDate, activity, mood, remark).subscribe(() => {this.router.navigate(['/list']);
    });
  }
}
