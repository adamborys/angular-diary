import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
      email: ['', Validators.required]
    });
    this.secondStep = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  registerUser(email: String, password: String) {
    this.authService.registerUser(email, password).subscribe(
      res => this.snackBar.open(String(res), 'Ok!', { duration: 5000 }),
      err => this.snackBar.open(String(err), 'Ok!', { duration: 5000 })
    );
  }

}
