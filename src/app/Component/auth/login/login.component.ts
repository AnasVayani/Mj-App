import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showPassword = false;
  logoPath = '/assets/logo-white.svg';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Change logo on mobile
    // if (window.innerWidth <= 767) {
    //   this.logoPath = '/assets/logo.svg';
    // }
  }

  // Toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Login Submission
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    // Mock Login (Replace with API Call)
    const { email, password } = this.loginForm.value;
    if (email !== 'user@example.com' || password !== 'password123') {
      alert('Invalid credentials!');
    } else {
      alert('Login successful!');
    }
  }
}
