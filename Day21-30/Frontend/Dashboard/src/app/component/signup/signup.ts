import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  email: string = '';
  password: string = '';
  @Output() switchToLogin = new EventEmitter<void>();

  onSubmit() {
    if (this.isFormValid()) {
      // Simulate signup logic
      alert('Signup successful!');
    }
  }

  isFormValid(): boolean {
    return !!this.email.trim() && !!this.password.trim();
  }

  goToLogin() {
    this.switchToLogin.emit();
  }
}
