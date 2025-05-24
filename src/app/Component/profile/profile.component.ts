import { assertPlatform, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CommonService } from 'src/app/services/commonService';

interface Card {
  type: 'MasterCard' | 'Visa';
  number: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  cities: any;
  isEditing = false;
  activeTab = 'personal-info'; // Default active tab
  searchQuery = ''; // Search input field

  addressForm!: FormGroup;
  isEditMode = false;
  selectedIndex: number | null = null;



  cards: Card[] = [
    { type: 'MasterCard', number: '3456 XX78 9800 55X3' },
    { type: 'Visa', number: '5677 3490 XX90 XX23' }
  ];

  cardForm!: FormGroup;
  isEditCardMode = false;
  selectedCardIndex: number | null = null;

  orders = [
    {
      id: 1,
      image: 'assets/product/product-img.png',
      name: 'Girls Pink Moana Printed Dress',
      size: 'S',
      qty: 1,
      price: 80,
      status: 'Delivered',
    },
    {
      id: 2,
      image: 'assets/product/product-img.png',
      name: 'Women Textured Handheld Bag',
      size: 'Regular',
      qty: 1,
      price: 80,
      status: 'In Process',
    },
    {
      id: 3,
      image: 'assets/product/product-img.png',
      name: 'Tailored Cotton Casual Shirt',
      size: 'M',
      qty: 1,
      price: 40,
      status: 'In Process',
    },
    {
      id: 4,
      image: 'assets/product/product-img.png',
      name: 'Men’s Running Shoes',
      size: '10',
      qty: 1,
      price: 120,
      status: 'Shipped',
    },
  ];
  products: any[] = []

  profile: any = {}
  addresses: any
  countries: any;
  states: any;

  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) {
    this.createForm();
    this.cardForm = this.fb.group({
      type: ['MasterCard', Validators.required],
      number: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]]
    });
  }
  ngOnInit(): void {
    this.getCountries();
    this.getCurrentUser();
    this.getUserWishlist();
    this.getUserAddresses();
    debugger
    console.log('Default country value:', this.addressForm.get('country')?.value); 
    
  }

  getAvatarUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
  }

  openCardModal(editIndex: number | null = null) {
    this.isEditCardMode = editIndex !== null;
    this.selectedCardIndex = editIndex;

    if (this.isEditCardMode) {
      const selectedCard = this.cards[editIndex!];
      this.cardForm.patchValue({
        type: selectedCard.type,
        number: selectedCard.number
      });
    } else {
      this.cardForm.reset();
    }

    const modal = new bootstrap.Modal(document.getElementById('cardModal')!);
    modal.show();
  }

  saveCard() {
    debugger
    if (this.cardForm.invalid) return;

    const newCard = this.cardForm.value;

    if (this.isEditCardMode && this.selectedCardIndex !== null) {
      this.cards[this.selectedCardIndex] = newCard;
    } else {
      this.cards.push(newCard);
    }

    this.closeCardModal();
  }

  deleteCard(index: number) {
    this.cards.splice(index, 1);
  }

  closeCardModal() {
    const modalElement = document.getElementById('cardModal');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    modal?.hide();
  }



  createForm() {
    this.addressForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      pinCode: ['', Validators.required],
      state: ['', Validators.required],
      defaultAddress: [false]
    });
  }

  openModal(id: number | null = null) {
    this.isEditMode = id !== null;
    this.selectedIndex = id;

    if (this.isEditMode) {
      const selectedAddress = this.addresses.find((addr: any) => addr.id === id);
      this.addressForm.reset();

      // Step 1: Set country and fetch states
      this.addressForm.patchValue({ country: selectedAddress.countryId });
      this.commonService.getStates(selectedAddress.countryId).subscribe(states => {
        this.states = states;

        // Step 2: Set state and fetch cities
        this.addressForm.patchValue({ state: selectedAddress.stateId });
        this.commonService.getCities(selectedAddress.stateId).subscribe(cities => {
          this.cities = cities;

          // Step 3: Set the rest of the values including city
          this.addressForm.patchValue({
            id: selectedAddress.id,
            name: selectedAddress.name,
            phone: selectedAddress.phoneNumber,
            address: selectedAddress.address,
            city: selectedAddress.cityId,
            pinCode: selectedAddress.pinCode,
            defaultAddress: selectedAddress.isDefault
          });
        });
      });
    } else {
      this.addressForm.reset();
    }

    const modal = new bootstrap.Modal(document.getElementById('addressModal')!);
    modal.show();
  }

  saveAddress() {
    if (this.addressForm.invalid) return;
    this.addOrUpdateUserAddress();
    this.closeModal();
  }

  closeModal() {
    const modalElement = document.getElementById('addressModal');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    modal?.hide();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    var request = {
      FirstName: this.profile.firstName,
      LastName: this.profile.lastName,
      PhoneNumber: this.profile.phoneNumber,
    }
    this.commonService.editUserDetails(request).subscribe({
      next: res => {
        this.isEditing = false;
      },
      error: err => {
        this.isEditing = false;
        alert("failed")
      }
    })

  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  get filteredOrders() {
    return this.orders.filter((order) =>
      order.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getUserWishlist() {
    this.commonService.getUserWishlist().subscribe({
      next: res => {
        this.products = res
      },
      error: err => {
      }
    })
  }

  goToProductDetail(product: any) {
    this.router.navigate(['/product-detail'], { state: { product } });
  }

  deleteWishListProduct(productId: number) {
    this.commonService.addToWishlist(productId).subscribe({
      next: res => {
        this.getUserWishlist();
      },
      error: err => {
        console.log("Error on deleteWishListProduct");
      }
    })
  }

  getCurrentUser() {
    this.commonService.getCurrentUser().subscribe({
      next: res => {
        this.profile = res
      },
      error: err => {
        console.log("Error on getCurrentUser");
      }
    })
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

  getUserAddresses() {
    this.commonService.getUserAddresses().subscribe({
      next: res => {
        this.addresses = res
      },
      error: err => {
        console.log("Error on getUserAddresses");
      }
    })
  }

  deletedUserAddress(addressId: number) {
    this.commonService.deletedUserAddress(addressId).subscribe({
      next: res => {
        this.getUserAddresses()
      },
      error: err => {
        console.log("Error on deletedUserAddress");
      }
    })
  }

  addOrUpdateUserAddress() {
    const formValues = this.addressForm.value;
    const request = {
      Id: this.isEditMode ? formValues.id : 0,
      Name: formValues.name,
      Address: formValues.address,
      PhoneNumber: formValues.phone,
      CityId: formValues.city,
      PinCode: formValues.pinCode,
      StateId: formValues.state,
      CountryId: formValues.country,
      IsDefault: formValues.defaultAddress == null ? false : formValues.defaultAddress,
      UserId: 0
    };
    this.commonService.addOrUpdateUserAddress(request).subscribe({
      next: res => {
        this.getUserAddresses()
      },
      error: err => {
        console.log("Error on addOrUpdateUserAddress");
      }
    })
  }
}
