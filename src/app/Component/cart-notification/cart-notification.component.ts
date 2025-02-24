import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-notification',
  templateUrl: './cart-notification.component.html',
  styleUrls: ['./cart-notification.component.scss']
})
export class CartNotificationComponent {
  cartOpen = false;
  cartItems = [
    { image: 'assets/product/product-img.png', title: 'Girls Pink Moana Printed Dress', size: 'L', price: 80.00 },
    { image: 'assets/product/product-img.png', title: 'Women Textured Handheld Bag', size: 'Regular', price: 50.00 },
    { image: 'assets/product/product-img.png', title: 'Tailored Cotton Casual Shirt', size: 'M', price: 70.00 },
    { image: 'assets/product/product-img.png', title: 'Another Product', size: 'S', price: 40.00 }, // Extra item (scroll needed)
  ];

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
