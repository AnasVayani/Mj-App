import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-part2',
  templateUrl: './footer-part2.component.html',
  styleUrls: ['./footer-part2.component.scss'],
})
export class FooterPart2Component {
  features = [
    {
      icon: 'ri-truck-line',
      title: 'Free Shipping',
      description: 'Free shipping for orders above $150',
    },
    {
      icon: 'ri-refund-2-line',
      title: 'Money Guarantee',
      description: 'Within 30 days for an exchange',
    },
    {
      icon: 'ri-headphone-line',
      title: 'Online Support',
      description: '24 hours a day, 7 days a week',
    },
    {
      icon: 'ri-bank-card-line',
      title: 'Flexible Payment',
      description: 'Pay with multiple credit cards',
    },
  ];
}
