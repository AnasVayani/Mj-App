import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

interface Category {
  id: number;
  name: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menCategories: Category[] = [];
  womenCategories: Category[] = [];
  SearchModal: Modal | null = null;
  
  constructor(private router: Router, private commonService: CommonService){
    this.itemTitles = this.items.map((item) => item.title); // ✅ Precompute array
  }
  ngOnInit(): void {
    debugger;
    const modalElement = document.getElementById('searchModal');
    if (modalElement) {
      this.SearchModal = new bootstrap.Modal(modalElement);
    }
    this.getAllCategories()
    throw new Error('Method not implemented.');
  }
  mobileMenuActive = false;
  dropdownActive = false;
  searchQuery: string = '';
  items = [
    {
      title: 'Charcoal Grey Silk Kurti',
      price: 3685,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Peach Silk Kurti',
      price: 2215,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Pink Silk Kurti',
      price: 4745,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Plum Silk Kurti',
      price: 3845,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'White Paper Cotton Kurti',
      price: 3685,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Aqua Cotton Kurti',
      price: 5005,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Charcoal Grey Silk Kurti',
      price: 3685,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Peach Silk Kurti',
      price: 2215,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Pink Silk Kurti',
      price: 4745,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Plum Silk Kurti',
      price: 3845,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'White Paper Cotton Kurti',
      price: 3685,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Aqua Cotton Kurti',
      price: 5005,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Charcoal Grey Silk Kurti',
      price: 3685,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Peach Silk Kurti',
      price: 2215,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Pink Silk Kurti',
      price: 4745,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Plum Silk Kurti',
      price: 3845,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'White Paper Cotton Kurti',
      price: 3685,
      image: 'assets/product/product-img.png',
    },
    {
      title: 'Aqua Cotton Kurti',
      price: 5005,
      image: 'assets/product/product-img.png',
    },
  ];

  itemTitles: string[] = []; // ✅ Store precomputed item titles
  filteredItems = [...this.items];

  filterResults(query: string) {
    this.searchQuery = query.trim();
    this.filteredItems = this.items.filter((item) =>
      item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  openSearchModal() {
    
    if (this.SearchModal) {
      // const modal = new bootstrap.Modal(modalElement);
      this.SearchModal.show();
    }
  }

  CloseModal() {
    this.router.navigate(['/search']);
    if (this.SearchModal) {
      // const modal = new bootstrap.Modal(modalElement);
      this.SearchModal.hide();
    }
  }
 
  getAllCategories(): void {
    this.commonService.getAll().subscribe(
      (response: Category[]) => {
        // Separating categories based on ID
        this.menCategories = response.filter(category => category.id === 1);
        this.womenCategories = response.filter(category => category.id === 2);

        console.log('Men Categories:', this.menCategories);
        console.log('Women Categories:', this.womenCategories);
      },
      (error: any) => console.error('Error fetching categories:', error)
    );
  }
  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  toggleDropdown(active: boolean) {
    this.dropdownActive = active;
  }
}
