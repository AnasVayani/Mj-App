import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss'],
})
export class SelectCountryComponent {
  selectedCountry: string = 'Pakistan'; // Default selection
  errorMessage: string = '';

  constructor(private router: Router) {}

  enterSite() {
    if (!this.selectedCountry) {
      this.errorMessage = 'Please select a country to proceed!';
    } else {
      localStorage.setItem('selectedCountry', this.selectedCountry);
      this.router.navigate(['/']); // Redirect to Home
    }
  }
}
