import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const emailFromRegisterForm = sessionStorage.getItem('email');
    if (emailFromRegisterForm) {
      this.loginForm.patchValue({
        email: emailFromRegisterForm
      });
      sessionStorage.clear();
    }
  }

  loginUser(email: String, password: String) {
    this.authService.loginUser(email, password).subscribe(
      res => {
        sessionStorage.setItem('token', res.body.token);
        console.log(this.authService.getCurrentUserId());
        this.router.navigate(['/list']);
      },
      err => {
        if (err.status === 401) {
          this.snackBar.open('Wrong login or password.', 'Ok', { duration: 3000 });
        } else {
          this.snackBar.open('Server unable to process request.', 'Try later', { duration: 3000 });
          console.log(err);
        }
      }
    );
  }

  register(email: String) {
    if (this.loginForm.controls.email.valid) {
      sessionStorage.setItem('email', this.loginForm.controls.email.value);
    }
    this.router.navigate(['/register']);
  }
}
