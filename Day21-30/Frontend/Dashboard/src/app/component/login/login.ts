import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  @Output() switchToSignup = new EventEmitter<void>();

  onSubmit() {
    if (this.isFormValid()) {
      // Simulate login logic
      alert('Login successful!');
    }
  }

  isFormValid(): boolean {
  return !!this.email.trim() && !!this.password.trim();
  }

  goToSignup() {
    this.switchToSignup.emit();
  }
}
