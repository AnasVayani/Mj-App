import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeAnimation } from './helper/route-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[fadeAnimation]
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;
  constructor(private router: Router) {
    
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeaderFooter = event.url !== '/select-country';
        window.scrollTo(0, 0);
      }
    });
    
    const selectedCountry = localStorage.getItem('selectedCountry');

    // Redirect to country selection if no country is selected and the user is on home ('/')
    if (!selectedCountry && this.router.url === '/') {
      this.router.navigate(['/select-country']);
    }
  }
}
