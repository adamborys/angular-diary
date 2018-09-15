import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatStepper } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { of  } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstStep: FormGroup;
  secondStep: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firstStep = this.fb.group({
      email: ['', Validators.compose([ Validators.required, Validators.email])]
    });
    this.secondStep = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
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
        this.router.navigate(['/list']);
      } else if (res.status === 202) {
        this.snackBar.open('E-mail already taken.', 'Ok', { duration: 3000 });
      } else {
        this.snackBar.open('Unable to add new user.', 'Try later', { duration: 3000 });
      }
    },
    err => {
      console.log(err);
    });
  }
}
