import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password)
      .then(() => this.router.navigate(['/']))
       .catch(err => {
      this.error = this.getErrorMessage(err.code);
    });
  }

  googleLogin() {
  this.auth.loginWithGoogle()
    .then(() => this.router.navigate(['/']))
     .catch(err => {
      this.error = this.getErrorMessagesso(err.code);
    });
}

getErrorMessage(error: any): string {
  if (error.includes('invalid-credential')) {
    return 'Invalid email or password';
  }

  if (error.includes('user-not-found')) {
    return 'No account found with this email';
  }

  if (error.includes('wrong-password')) {
    return 'Incorrect password';
  }

  if (error.includes('invalid-email')) {
    return 'Invalid email format';
  }

  return 'Something went wrong';
}

getErrorMessagesso(error: any): string {

  const code = error || '';

  if (code.includes('invalid-credential')) {
    return 'Invalid email or password';
  }

  if (code.includes('user-not-found')) {
    return 'No account found with this email';
  }

  if (code.includes('wrong-password')) {
    return 'Incorrect password';
  }

  if (code.includes('invalid-email')) {
    return 'Invalid email format';
  }


  if (code.includes('popup-closed-by-user')) {
    return 'Login popup was closed';
  }

  if (code.includes('network-request-failed')) {
    return 'Check your internet connection';
  }

  if (code.includes('cancelled-popup-request')) {
    return 'Login was cancelled';
  }

  return 'Something went wrong. Please try again';
}
}
