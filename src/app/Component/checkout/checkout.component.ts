import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit{
  currentStep = 1;
  checkoutForm: FormGroup;
  paymentForm: FormGroup;
  selectedPayment: string = 'creditCard'; // Default selected payment method


  private modalInstance!: Modal;

  addresses = [
    {
      id: 1,
      name: 'Robert Fox',
      address: '4517 Washington Ave, Manchester, Kentucky 39459',
      selected: true,
    },
    {
      id: 2,
      name: 'John Willions',
      address: '3891 Ranchview Dr, Richardson, California 62639',
      selected: false,
    },
  ];
  selectedAddress: any = null;


  estimatedDelivery = '22 Feb 2022';

  orderItems = [
    {
      name: 'Girls Pink Moana Printed Dress',
      price: 80.0,
      size: 'S',
      image: 'assets/product/product-img.png',
    },
    {
      name: 'Women Textured Handheld Bag',
      price: 80.0,
      size: 'Regular',
      image: 'assets/product/product-img.png',
    },
    {
      name: 'Tailored Cotton Casual Shirt',
      price: 40.0,
      size: 'M',
      image: 'assets/product/product-img.png',
    },
  ];

  shippingAddress = {
    name: 'Robert Fox',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
  };

  paymentMethod = {
    type: 'Debit Card',
    maskedNumber: '.... .... .... ..89',
  };





  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      flat: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      state: ['', Validators.required],
      default: [false],
    });

    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9 ]{16,19}$')],
      ],
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/(\\d{2})$'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      paymentMethod: ['creditCard', Validators.required], // Default selection
    });
  }
  ngOnInit(): void {
    // debugger
    const modalElement = document.getElementById('orderConfirmationModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  }

  openModal() {
    // debugger
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  selectAddress(index: number) {
    if (this.selectedAddress === index) {
      // If the same address is clicked again, unselect it
      this.selectedAddress = null;
      this.addresses[index].selected = false;
    } else {
      // Select the new address and unselect others
      this.selectedAddress = index;
      this.addresses.forEach((address, i) => {
        address.selected = i === index;
      });
    }
  }

  nextStep() {
    if (this.currentStep < 4) this.currentStep++;
  }

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  submitCheckout() {
    alert('Order Placed Successfully!');
  }

  selectPayment(method: string) {
    this.selectedPayment = method;
    if (method !== 'creditCard') {
      this.paymentForm.reset(); // Clear form fields when switching away
    }
  }


  editAddress() {
    console.log('Edit Address Clicked');
  }

  editPayment() {
    console.log('Edit Payment Clicked');
  }
}
