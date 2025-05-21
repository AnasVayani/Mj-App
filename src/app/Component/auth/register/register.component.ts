import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  {
  registerForm: FormGroup;
  submitted = false;
  showPassword = false;
  logoPath = '/assets/logo-white.svg';

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.register(this.registerForm)
      console.log('Form Submitted', this.registerForm.value);
    }
  }

  register(form: any) {
    var request = {
      FirstName: form.value.firstName,
      LastName: form.value.lastName,
      Email: form.value.email,
      Password: form.value.password
    }
    this.commonService.registerUser(request).subscribe({
      next: res => {
          alert('Registered successfully')
          this.router.navigate(["/login"])
      },
      error: err => {
        alert('Registered failed')
      }
    })
  }
}
