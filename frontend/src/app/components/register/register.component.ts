import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstStep: FormGroup;
  secondStep: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstStep = this.fb.group({
      email: ['', Validators.required]
    });
    this.secondStep = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

}
