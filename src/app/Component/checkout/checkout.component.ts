import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  step = 1;
  progressWidth = '25%';

  addresses = [
    { name: 'Robert Fox', street: '4517 Washington Ave. Kentucky 39495' },
    {
      name: 'John Willions',
      street: '3891 Ranchview Dr. Richardson, California 62639',
    },
  ];

  selectedAddress: number | null = null;
  addressForm: FormGroup;
  cities = ['New York', 'Los Angeles', 'Chicago'];

  subtotal = 200.0;
  deliveryCharge = 5.0;
  discountCode = '';
  grandTotal = this.subtotal + this.deliveryCharge;
  cartItems = [
    {
      title: 'Product 1',
      price: 50,
      quantity: 2,
      image: 'assets/img/product1.jpg',
    },
    {
      title: 'Product 2',
      price: 100,
      quantity: 1,
      image: 'assets/img/product2.jpg',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5,6}$')]],
      state: ['', Validators.required],
      default: [false],
    });
  }

  /**
   * Select an existing address
   */
  selectAddress(index: number) {
    this.selectedAddress = index;
  }

  /**
   * Add a new address
   */
  addAddress() {
    if (this.addressForm.valid) {
      this.addresses.push({
        name: this.addressForm.value.name,
        street: `${this.addressForm.value.street}, ${this.addressForm.value.area}`,
      });
      this.addressForm.reset();
    }
  }

  /**
   * Apply discount code
   */
  applyDiscount() {
    if (this.discountCode === 'FLAT50') {
      this.grandTotal = this.subtotal - 50 + this.deliveryCharge;
    }
  }

  /**
   * Go to next step
   */
  nextStep() {
    if (this.step < 4) {
      this.step++;
      this.progressWidth = `${this.step * 25}%`;
    }
  }

  /**
   * Go to previous step
   */
  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.progressWidth = `${this.step * 25}%`;
    }
  }

  /**
   * Select payment method
   */
  selectPayment(method: string) {
    console.log(`Selected Payment Method: ${method}`);
  }

  /**
   * Open order confirmation popup
   */
  openPaymentPopup() {
    const modal = new bootstrap.Modal(
      document.getElementById('orderSuccessModal')!
    );
    modal.show();
  }

  /**
   * Reset the checkout process after successful order
   */
  closeModal() {
    this.step = 1;
    this.progressWidth = '25%';
  }
}
