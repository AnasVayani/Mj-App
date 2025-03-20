import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

interface Address {
  name: string;
  address: string;
  phone: string;
}

interface Card {
  type: 'MasterCard' | 'Visa';
  number: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
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
  products = [
    {
      brand: 'Allen Solly',
      name: 'Women Textured Handheld Bag',
      currentPrice: 80.0,
      originalPrice: 100.0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'Louis Philippe Sport',
      name: 'Polo Collar T-Shirt',
      currentPrice: 50.0,
      originalPrice: 55.0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'Adidas',
      name: 'Men Adidas Running Shoes',
      currentPrice: 60.0,
      originalPrice: 75.0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'Allen Solly',
      name: 'Brown Leather Jacket',
      currentPrice: 60.0,
      originalPrice: 70.0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'US Polo',
      name: 'Casual Shoe for Men',
      currentPrice: 40.0,
      originalPrice: 50.0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'Gucci',
      name: 'Leather Hand Purse',
      currentPrice: 40.0,
      originalPrice: 0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'YK Disney',
      name: 'Red Printed T-Shirt',
      currentPrice: 30.0,
      originalPrice: 0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'Roadstar',
      name: 'Printed Blazer for Men',
      currentPrice: 60.0,
      originalPrice: 0,
      image: 'assets/product/product-img.png',
    },
    {
      brand: 'Flora',
      name: 'Leather Hand Purse',
      currentPrice: 35.0,
      originalPrice: 40.0,
      image: 'assets/product/product-img.png',
    },
  ];

  profile = {
    firstName: 'Robert',
    lastName: 'Fox',
    phone: '(252) 555-0126',
    email: 'robertfox@example.com',
    address: '2464 Royal Ln. Mesa, New Jersey 45463',
  };
  addresses: Address[] = [
    {
      name: 'Robert Fox',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
      phone: '(209) 555-0104',
    },
    {
      name: 'John Willions',
      address: '3891 Ranchview Dr. Richardson, California 62639',
      phone: '(270) 555-0117',
    },
    {
      name: 'Alexa Johnson',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
      phone: '(208) 555-0112',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.cardForm = this.fb.group({
      type: ['MasterCard', Validators.required],
      number: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]]
    });
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
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: ['', Validators.required],
      state: ['', Validators.required],
      defaultAddress: [false]
    });
  }

  openModal(editIndex: number | null = null) {
    this.isEditMode = editIndex !== null;
    this.selectedIndex = editIndex;

    if (this.isEditMode) {
      const selectedAddress = this.addresses[editIndex!];
      this.addressForm.patchValue({
        name: selectedAddress.name,
        phone: selectedAddress.phone,
        address: selectedAddress.address
      });
    } else {
      this.addressForm.reset();
    }

    const modal = new bootstrap.Modal(document.getElementById('addressModal')!);
    modal.show();
  }

  saveAddress() {
    if (this.addressForm.invalid) return;

    const newAddress = this.addressForm.value;

    if (this.isEditMode && this.selectedIndex !== null) {
      this.addresses[this.selectedIndex] = newAddress;
    } else {
      this.addresses.push(newAddress);
    }

    this.closeModal();
  }

  deleteAddress(index: number) {
    this.addresses.splice(index, 1);
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
    this.isEditing = false;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  get filteredOrders() {
    return this.orders.filter((order) =>
      order.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
