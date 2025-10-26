import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  users: User[] = [];
  private router=inject(Router);
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (user) => {(this.users = user || []);
        console.log('Fetched users:', this.users);  
      },
      error: (err) => {
        console.warn('Failed to fetch users', err);
      },
    });
  }
  onSubmit() {
    if (!this.isFormValid()) return;

    const found = this.users.find(
      (u) => u.userEmail?.toLowerCase() === this.email.trim().toLowerCase()
    );
    
    if (!found) {
      alert('User not found. Please sign up.');
      return;
    }

    if (found.userPassword !== this.password) {
      alert('Invalid password.');
      return;
    }

    alert('Login successful!');
    this.router.navigate(['/orders']);
  }

  isFormValid(): boolean {
    return !!this.email.trim() && !!this.password.trim();
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
