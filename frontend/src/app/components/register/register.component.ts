import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatStepper } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstStep: FormGroup;
  secondStep: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.firstStep = this.fb.group({
      email: ['', Validators.compose([ Validators.required, Validators.email])]
    });
    this.secondStep = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    const emailFromLoginForm = sessionStorage.getItem('email');
    if (emailFromLoginForm) {
      this.firstStep.patchValue({
        email: emailFromLoginForm
      });
      sessionStorage.clear();
    }
  }

  registerUser(email: String, password: String) {
    this.authService.findUser(email).pipe(
      switchMap(res => {
        if (res.status === 202) {
          return of(res);
        }
        return this.authService.registerUser(email, password);
      })
    ).subscribe(res => {
      console.log(res);
      if (res.status === 201) {
        sessionStorage.setItem('token', res.body.token);
        this.router.navigate(['/list']);
      } else if (res.status === 202) {
        this.snackBar.open('E-mail already taken.', 'Ok', { duration: 3000 });
      } else {
        this.snackBar.open('Server unable to process request.', 'Try later', { duration: 3000 });
      }
    },
    err => {
      this.snackBar.open('Server unable to process request.', 'Try later', { duration: 3000 });
      console.log(err);
    });
  }

  login(email: String) {
    if (this.firstStep.controls.email.valid) {
      sessionStorage.setItem('email', this.firstStep.controls.email.value);
    }
    this.router.navigate(['/login']);
  }
}
