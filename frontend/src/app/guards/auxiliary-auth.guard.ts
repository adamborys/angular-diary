import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      const ref = this.snackBar.open('You\'re already logged in', 'Ok', {duration: 3000});
      ref.afterDismissed().subscribe(() => {
        this.router.navigate(['/list']);
      });
      return false;
    }
  }
}
