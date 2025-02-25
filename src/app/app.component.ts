import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = event.url !== '/select-country';
      }
    });
  }

  ngOnInit() {
    const selectedCountry = localStorage.getItem('selectedCountry');

    // Redirect to country selection if no country is selected and the user is on home ('/')
    if (!selectedCountry && this.router.url === '/') {
      this.router.navigate(['/select-country']);
    }
  }
}
