import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { OrderRequest } from 'src/app/model/order-model';
import { CommonService } from 'src/app/services/commonService';
import Swal from 'sweetalert2';

declare var Square: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit {
  currentStep = 1;
  checkoutForm: FormGroup;
  paymentForm: FormGroup;
  selectedPayment: string = 'cashOnDelivery'; // Default selected payment method
  currency = this.commonService.getCurrency();
  orderRequest: OrderRequest = new OrderRequest()


  private modalInstance!: Modal;

  addresses: {
    id: number;
    name: string;
    address: string;
    isDefault: boolean;
    cityId: number;
    stateId: number;
    countryId: number;
    pinCode: string;
    phoneNumber: string;
  }[] = [];
  selectedAddress: any = null;
  isUserLoggedIn = this.commonService.isLoggedIn();

  estimatedDelivery: string = '';

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
  countries: any;
  states: any;
  cities: any;
  grandTotal: number = 0;
  deliveryCharges: number = 0;
  subTotal: number = 0;
  cartItems: any




  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      flat: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
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
  async ngOnInit(): Promise<void> {
    this.getCountries();
    this.getUserAddress();
    this.getOrdersGrandTotal();
    this.getCartItems();
    this.setDeilveryDate();
    // debugger
    const modalElement = document.getElementById('orderConfirmationModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  }

  openModal() {
    this.orderCheckOut()
  }

  selectAddress(index: number) {
    if (this.selectedAddress === index) {
      // If the same address is clicked again, unselect it
      this.selectedAddress = null;
      this.addresses[index].isDefault = false;
    } else {
      this.orderRequest.customerName = this.addresses[index].name
      this.orderRequest.area = this.addresses[index].address
      this.orderRequest.phoneNo = this.addresses[index].phoneNumber
      this.orderRequest.houseNo = this.addresses[index].address.split(' ')[0]
      this.orderRequest.stateId = this.addresses[index].stateId
      this.orderRequest.cityId = this.addresses[index].cityId
      this.orderRequest.countryId = this.addresses[index].countryId
      this.orderRequest.pinCode = this.addresses[index].pinCode
      this.selectedAddress = index;
      this.addresses.forEach((address, i) => {
        address.isDefault = i === index;
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

  sendToBackend(token: string) {
    // var request = {
    //   PaymentToken: token,
    //   OrderId: 1
    // }
    // this.commonService.paymentCheckout(request).subscribe({
    //   next: res => {
    //     alert("payment completed")
    //   },
    //   error: err => {
    //     alert("payment failed")
    //   }
    // })
  }

  getUserAddress() {
    if (this.isUserLoggedIn) {
      this.commonService.getUserAddresses().subscribe({
        next: res => {
          const len = res.length;
          if (len >= 2) {
            this.addresses = res.slice(len - 2);
          } else if (len === 1) {
            this.addresses = [res[0]];
          } else {
            this.addresses = [];
          }
          const defaultIndex = this.addresses.findIndex(addr => addr.isDefault);
          this.selectedAddress = defaultIndex !== -1 ? defaultIndex : null;
          let address = this.addresses[this.selectedAddress];
          this.orderRequest.customerName = address.name
          this.orderRequest.area = address.address
          this.orderRequest.phoneNo = address.phoneNumber
          this.orderRequest.houseNo = address.address.split(' ')[0]
          this.orderRequest.stateId = address.stateId
          this.orderRequest.cityId = address.cityId
          this.orderRequest.countryId = address.countryId
          this.orderRequest.pinCode = address.pinCode
        },
        error: err => {
          console.log("Error on getUserAddress");
        }
      })
    }
  }

  getCountries() {
    this.commonService.getCountries().subscribe({
      next: res => {
        this.countries = res
      },
      error: err => {
        console.log("Error on getCountries");
      }
    })
  }

  getStates(countryId: number) {
    this.commonService.getStates(countryId).subscribe({
      next: res => {
        this.states = res
      },
      error: err => {
        console.log("Error on getStates");
      }
    })
  }

  getCities(stateId: number) {
    this.commonService.getCities(stateId).subscribe({
      next: res => {
        this.cities = res
      },
      error: err => {
        console.log("Error on getCities");
      }
    })
  }

  onStateChange(stateId: any | null) {
    this.getCities(stateId)
  }

  onCountryChange(countryId: any | null) {
    this.getStates(countryId)
  }

  getOrdersGrandTotal() {
    const userId = this.commonService.currentUserId()
    const guestToken = localStorage.getItem('guestToken')
    this.commonService.getOrdersGrandTotal(userId, guestToken)?.subscribe({
      next: res => {
        this.grandTotal = res.subTotal + res.deliveryCharges
        this.deliveryCharges = res.deliveryCharges
        this.subTotal = res.subTotal
      },
      error: err => {
        console.log("Error on getOrdersGrandTotal");
      }
    })
  }

  getCartItems() {
    const userId = this.commonService.currentUserId()
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

  orderCheckOut() {
    let currentUserId = this.commonService.currentUserId();
    let guestToken = localStorage.getItem('guestToken')
    if (currentUserId || guestToken) {
      if (guestToken) {
        let checkoutForm = this.checkoutForm.value
        this.orderRequest.customerName = checkoutForm.name
        this.orderRequest.area = checkoutForm.area
        this.orderRequest.phoneNo = checkoutForm.mobile
        this.orderRequest.houseNo = checkoutForm.flat
        this.orderRequest.stateId = checkoutForm.state
        this.orderRequest.cityId = checkoutForm.city
        this.orderRequest.countryId = checkoutForm.country
        this.orderRequest.pinCode = checkoutForm.pinCode
      }
      this.orderRequest.userId = currentUserId
      this.orderRequest.guestToken = guestToken
      this.orderRequest.paymentMode = this.selectedPayment == 'cashOnDelivery' ? 1 : 2
      this.commonService.orderCheckOut(this.orderRequest).subscribe({
        next: res => {
          if (this.selectedPayment == 'cashOnDelivery') {
            if (this.modalInstance) {
              this.modalInstance.show();
            }
          }
          else {
            if (res.paymentLink) {
              window.location.href = res.paymentLink
            }
          }
        },
        error: err => {
          console.log("error on orderCheckOut");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error,
            footer: '<a href="mailto:info@mjexclusive.com">Contact support</a>'
          });
        }
      })
    }
  }

  addOrUpdateUserAddress() {
    const formValues = this.checkoutForm.value;
    const request = {
      Id: 0,
      Name: formValues.name,
      Address: formValues.flat + ' ' + formValues.area,
      PhoneNumber: formValues.mobile,
      CityId: formValues.city,
      PinCode: formValues.pinCode,
      StateId: formValues.state,
      CountryId: formValues.country,
      IsDefault: formValues.default == null ? false : formValues.default,
      UserId: 0
    };
    this.commonService.addOrUpdateUserAddress(request).subscribe({
      next: res => {
        this.getUserAddress()
      },
      error: err => {
        console.log("Error on addOrUpdateUserAddress");
      }
    })
  }

  setDeilveryDate() {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);

    const day = deliveryDate.getDate().toString().padStart(2, '0');
    const month = deliveryDate.toLocaleString('en-US', { month: 'short' });
    const year = deliveryDate.getFullYear();

    this.estimatedDelivery = `${day} ${month} ${year}`;

  }

}
