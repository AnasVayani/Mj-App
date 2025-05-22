import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

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

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) { }

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
    this.login(email, password)
  }

  login(email: any, password: any) {
    this.commonService.loginUser(email, password).subscribe({
      next: res => {
        if (res && res.data) {
          localStorage.setItem('UserContext', JSON.stringify(res.data))
          localStorage.removeItem("guestToken");
        }
        this.router.navigate(["/"])
      },
      error: err => {
        alert("login failed")
      }
    })
  }
}
