import { Component } from '@angular/core';

@Component({
  selector: 'app-addto-cart',
  templateUrl: './addto-cart.component.html',
  styleUrls: ['./addto-cart.component.scss'],
})
export class AddtoCartComponent {
  cartItems = [
    {
      image: 'assets/product/product-img.png',
      title: 'Girls Pink Moana Printed Dress',
      size: 'S',
      price: 80.0,
      quantity: 1,
    },
    {
      image: 'assets/product/product-img.png',
      title: 'Women Textured Handheld Bag',
      size: 'Regular',
      price: 80.0,
      quantity: 1,
    },
    {
      image: 'assets/product/product-img.png',
      title: 'Tailored Cotton Casual Shirt',
      size: 'M',
      price: 40.0,
      quantity: 1,
    },
  ];

  discountCode = '';
  discountAmount = 50;
  deliveryCharge = 5;

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  applyDiscount() {
    if (this.discountCode === 'FLAT50') {
      this.discountAmount = 50;
    } else {
      this.discountAmount = 0;
    }
  }

  getGrandTotal(): number {
    return this.getSubtotal() - this.discountAmount + this.deliveryCharge;
  }
}
