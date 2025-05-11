import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { CommonService } from 'src/app/services/commonService';

interface Category {
  id: number;
  name: string;
  type: string;
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

  mobileMenuActive = false;
  dropdownActive = false;
  searchQuery: string = '';
  filteredItems: any

  constructor(private router: Router, private commonService: CommonService) {

  }
  ngOnInit(): void {
    const modalElement = document.getElementById('searchModal');
    if (modalElement) {
      this.SearchModal = new bootstrap.Modal(modalElement);
    }
    this.getAllCategories()
  }
  filterResults(query: string) {
    this.searchQuery = query.trim();
    this.commonService.searchProducts(query).subscribe({
      next: res => {
        this.filteredItems = res
      },
      error: err => {
        console.log("Error on filterResults");
      }
    })
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
        this.menCategories = response.filter(category => category.type === 'Men');
        this.womenCategories = response.filter(category => category.type === 'Women');

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

  goToProduct(type: number, categoryId: number) {
    debugger;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product'], {
        state: {
          type: type,
          categoryId: categoryId
        }
      });
    });
  }

  goToProductDetail(productId: number) {
    this.commonService.GetProductById(productId).subscribe({
      next: res => {
        this.searchQuery = ''
        this.filteredItems = []
        this.CloseModal();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/product-detail'], {
            state: {
              product: res,
            }
          });
        });
      },
      error: err => {
        console.log('Error goToProductDetail');
      }
    })
  }

}
