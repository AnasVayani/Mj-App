import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeAnimation } from './helper/route-animations';
import { CommonService } from './services/commonService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;
  private authRoutes = ['/login', '/register', '/forget-password', '/select-country'];

  constructor(private router: Router, private commonService: CommonService) {

  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnInit() {
    if (!this.commonService.isLoggedIn()) {
      let guestToken = localStorage.getItem('guestToken');
      if (!guestToken) {
        guestToken = crypto.randomUUID();
        localStorage.setItem('guestToken', guestToken);
      }
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = event.url !== '/select-country';

        this.showHeaderFooter = !this.authRoutes.includes(event.url);
        window.scrollTo(0, 0);


        // const isAuthenticated = !!localStorage.getItem('userToken'); // Adjust this based on your authentication logic
        // if (isAuthenticated && this.authRoutes.includes(event.url)) {
        //   this.router.navigate(['/']); // Redirect to home or dashboard
        // }
      }
    });

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
