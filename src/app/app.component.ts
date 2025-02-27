import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;
  private authRoutes = ['/login', '/register', '/forget-password','/select-country'];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = event.url !== '/select-country';
        
        this.showHeaderFooter = !this.authRoutes.includes(event.url);


        // const isAuthenticated = !!localStorage.getItem('userToken'); // Adjust this based on your authentication logic
        // if (isAuthenticated && this.authRoutes.includes(event.url)) {
        //   this.router.navigate(['/']); // Redirect to home or dashboard
        // }
      }
    });
  }

  ngOnInit() {
    const selectedCountry = localStorage.getItem('selectedCountry');

    // Redirect to country selection if no country is selected and the user is on home ('/')
    if (!selectedCountry && this.router.url === '/') {
      this.router.navigate(['/select-country']);
    }


    // Prevent access to auth routes if logged in
    // const isAuthenticated = !!localStorage.getItem('userToken'); // Check login status
    // if (isAuthenticated && this.authRoutes.includes(this.router.url)) {
    //   this.router.navigate(['/']); // Redirect to home or dashboard
    // }
  }
}
