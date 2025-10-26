import { Component, inject,} from '@angular/core';
import { UserService, User } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  private router=inject(Router);

  constructor(private userService: UserService) {}

  onSubmit() {
    if (!this.canSubmit()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!this.isStrongPassword(this.password)) {
      alert('Password must be at least 8 characters and include letters and numbers.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const payload: User = {
      userName: this.username.trim(),
      userEmail: this.email.trim(),
      userPassword: this.password,
    };

    this.userService.createUser(payload).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        alert('Signup successful!');
      },
      error: (err) => {
        alert('Signup failed. Please try again.');
        console.error('Signup error', err);
      },
    });
  }

  canSubmit(): boolean {
    return (
      !!this.username.trim() &&
      !!this.email.trim() &&
      !!this.password.trim() &&
      !!this.confirmPassword.trim()
    );
  }

  private isValidEmail(email: string): boolean {
    if(email.includes('@')&&email.includes('.com')){
      return true;
    }
    return false;
  }

  private isStrongPassword(pw: string): boolean {
    if (pw.length < 8) return false;
    const hasLetter = /[A-Za-z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    return hasLetter && hasNumber;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
