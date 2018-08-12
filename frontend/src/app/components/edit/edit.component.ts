import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import MY_FORMATS from '../../globals';

import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class EditComponent implements AfterViewInit {

  id: string;
  entry: any = {};
  editForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private entryService: EntryService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.editForm = this.fb.group({
      time: ['', Validators.required],
      date: ['', Validators.required],
      activity: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      mood: ['', Validators.required],
      remark: ''
    });
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.entryService.getEntryById(this.id).subscribe(res => {
        this.entry = res;
        const timedate = moment(this.entry.date);
        this.editForm.get('time').setValue(timedate.format('HH:mm'));
        this.editForm.get('date').setValue(this.entry.date);
        this.editForm.get('activity').setValue(this.entry.activity);
        this.editForm.get('mood').setValue(this.entry.mood);
        this.editForm.get('remark').setValue(this.entry.remark);
      });
    });
  }

  setMinutes(time: string, minutes: string) {
    const timeInput = time.split(':');
    const hour = timeInput[0];
    this.editForm.patchValue({
      time: hour + ':' + minutes
    });
    this.editForm.markAsDirty();
  }

  setDay(date: string, value: moment.DurationInputArg1) {
    const dayDate = moment(date, 'DD/MM/YYYY');
    dayDate.add(value, 'days');
    this.editForm.patchValue({
      date: dayDate.toDate()
    });
    this.editForm.markAsDirty();
  }

  editEntry(time, date, activity, mood, remarks) {
    const timeInput = time.split(':');
    // tslint:disable-next-line:prefer-const
    let timeDate = moment(date, 'DD/MM/YYYY HH:mm');
    timeDate.add(timeInput[0], 'hours');
    timeDate.add(timeInput[1], 'minutes');
    this.entryService.editEntry(this.id, timeDate, activity, mood, remarks).subscribe(() => {
      this.snackBar.open('Entry saved', 'OK', { duration: 3000 });
      this.router.navigate(['/list']);
    });
  }

}
