import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-addto-cart',
  templateUrl: './addto-cart.component.html',
  styleUrls: ['./addto-cart.component.scss'],
})
export class AddtoCartComponent implements OnInit {
  constructor(private commonService: CommonService) {
  }
  ngOnInit(): void {
    this.getCartItems();
  }
  cartItems: any

  discountCode = '';
  discountAmount = 50;
  deliveryCharge = 5;
  currency = this.commonService.getCurrency();

  increaseQuantity(index: number, id: number) {
    this.cartItems[index].cart.quantity++;
    var cartQuantity = this.cartItems[index].cart.quantity
    this.updateCartItemQuantity(id, cartQuantity)
  }

  decreaseQuantity(index: number, id: number) {
    if (this.cartItems[index].cart.quantity > 1) {
      this.cartItems[index].cart.quantity--;
      var cartQuantity = this.cartItems[index].cart.quantity
      this.updateCartItemQuantity(id, cartQuantity)
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (total: any, item: any) => total + item.cart.price * item.cart.quantity,
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
    return this.getSubtotal() + this.deliveryCharge;
  }

  getCartItems() {
    let userId = null
    let userJson = localStorage.getItem('UserContext');
    if (userJson) {
      var user = JSON.parse(userJson)
      userId = user.id
    }
    let guestToken = localStorage.getItem('guestToken');
    this.commonService.getCartItems(userId, guestToken)?.subscribe({
      next: res => {
        this.cartItems = res
      },
      error: err => {
        console.log("Error on getCartItems");
      }
    })
  }

  removeCartItem(id: number) {
    this.commonService.removeCartItem(id)?.subscribe({
      next: res => {
        if (res == true) {
          this.getCartItems();
        }
      },
      error: err => {
        console.log("Error on removeCartItem");
      }
    })
  }

  updateCartItemQuantity(id: number, quantity: number) {
    this.commonService.updateCartItemQuantity(id, quantity)?.subscribe({
      next: res => {
        if (res == true) {
          this.getCartItems();
        }
      },
      error: err => {
        console.log("Error on updateCartItemQuantity");
      }
    })
  }
}
