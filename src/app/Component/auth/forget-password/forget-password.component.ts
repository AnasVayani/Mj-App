import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  step = 1; // Step control (1: Email input, 2: OTP input)
  submitted = false;
  otpSubmitted = false;

  logoPath = '/assets/logo-white.svg';
  forgetForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;

  showNewPassword = false;
  showConfirmPassword = false;

  otpBoxes = new Array(4); // 4-digit OTP input

  generatedOTP = '1234';

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.otpForm = this.fb.group({
      otp0: ['', Validators.required],
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.forgetForm.valid) {
      console.log('OTP Sent to:', this.forgetForm.value.email);
      this.step = 2;
    }
  }

  togglePasswordVisibility(field: string) {
    if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  moveFocus(event: any, index: number) {
    const inputLength = event.target.value.length;
    if (inputLength === 1 && index < 3) {
      (
        document.querySelectorAll('.otp-box')[index + 1] as HTMLInputElement
      ).focus();
    }
  }

  backspace(event: any, index: number) {
    if (event.target.value.length === 0 && index > 0) {
      (
        document.querySelectorAll('.otp-box')[index - 1] as HTMLInputElement
      ).focus();
    }
  }

  // Allow only numeric input
  preventNonNumeric(event: KeyboardEvent) {
    if (
      !/^\d$/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Tab'
    ) {
      event.preventDefault();
    }
  }

  verifyOTP() {
    const enteredOTP =
      this.otpForm.value.otp0 +
      this.otpForm.value.otp1 +
      this.otpForm.value.otp2 +
      this.otpForm.value.otp3;

    if (enteredOTP === this.generatedOTP) {
      console.log('OTP Verified Successfully');
      this.step = 3; // Move to new password step
    } else {
      alert('Invalid OTP, please try again.');
    }
  }

  submitNewPassword() {
    this.submitted=false;
    if (this.passwordForm.valid) {
      if (
        this.passwordForm.value.newPassword ===
        this.passwordForm.value.confirmPassword
      ) {
        this.submitted=true;
        console.log('Password Updated Successfully');
        this.showSuccessModal(); // Show modal
      } else {
        alert('Passwords do not match.');
      }
    }
  }

  // Show success modal
  showSuccessModal() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      new bootstrap.Modal(modalElement).show();
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
