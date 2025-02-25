import { Component, HostListener, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

interface Product {
  id: number;
  name: string;
  type: string;
  hashTag: string;
  desc: string;
  discount: number;
  imageUrl: string[];
  price: number;
  oldPrice: number;
  category: {
    id: number;
    name: string;
  };
  color: string;
  size: string;
  productDetails: any[];
}

@Component({
  selector: 'app-tshirts',
  templateUrl: './tshirts.component.html',
  styleUrls: ['./tshirts.component.scss'],
})
export class TshirtsComponent  implements OnInit{
  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 1;
  categoryId: number = 1; // Example category ID for T-Shirts
  type: number = 1; // Example type filter
  sizeFilter: string = ''; // If you want to filter by size


  showFilters: boolean = true;
  screenWidth: number = window.innerWidth; // Store screen width
  showApplyButton: boolean = false;
  showResetButton: boolean = false;
  _products: any[] = [];
  category: string = '';
  
  // products: Product[] = [
  //   { name: 'Allen Solly',        desc:'lorem',   image: 'assets/product/product-img.png', price: 80, oldPrice: 100, category: 'Men', color: 'Red', size: 'M' },
  //   { name: 'Adidas Shoes',       desc:'lorem',   image: 'assets/product/product-img.png', price: 60, oldPrice: 75, category: 'Men', color: 'Blue', size: 'L' },
  //   { name: 'Roadstar T-Shirt',   desc:'lorem',   image: 'assets/product/product-img.png', price: 38, oldPrice: 40, category: 'Men', color: 'Black', size: 'XL' },
  //   { name: 'Flora Hand Purse',   desc:'lorem',   image: 'assets/product/product-img.png', price: 35, oldPrice: 45, category: 'Women', color: 'Orange', size: 'M' },
  //   { name: 'Nike Hoodie',        desc:'lorem',   image: 'assets/product/product-img.png', price: 55, oldPrice: 65, category: 'Men', color: 'Green', size: 'L' },
  //   { name: 'Puma Jacket',        desc:'lorem',   image: 'assets/product/product-img.png', price: 90, oldPrice: 120, category: 'Men', color: 'Black', size: 'M' },
  //   { name: 'Levi’s Jeans',       desc:'lorem',   image: 'assets/product/product-img.png', price: 70, oldPrice: 90, category: 'Men', color: 'Blue', size: 'L' },
  //   { name: 'H&M Dress',          desc:'lorem',   image: 'assets/product/product-img.png', price: 100, oldPrice: 150, category: 'Women', color: 'Red', size: 'S' },
  //   { name: 'Gucci Belt',         desc:'lorem',   image: 'assets/product/product-img.png', price: 120, oldPrice: 160, category: 'Bags', color: 'Black', size: 'M' },
  //   { name: 'LV Handbag',         desc:'lorem',   image: 'assets/product/product-img.png', price: 250, oldPrice: 300, category: 'Women', color: 'Brown', size: 'L' },
  //   { name: 'Ray-Ban Sunglasses', desc:'lorem',   image: 'assets/product/product-img.png', price: 85, oldPrice: 95, category: 'Men', color: 'Black', size: 'M' },
  // ];

  filteredProducts: Product[] = [...this.products];
  paginatedProducts: Product[] = [];
  // currentPage: number = 1;
  itemsPerPage: number = 10;

  categories: string[] = ['Men', 'Women', 'Kids', 'Bags', 'Belts'];
  colors: string[] = ['Red', 'Blue', 'Orange', 'Black', 'Green', 'Yellow'];
  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];

  selectedCategories: { [key: string]: boolean } = {};
  selectedColors: { [key: string]: boolean } = {};
  selectedSizes: { [key: string]: boolean } = {};
  minPrice = 0;
  maxPrice = 2000;

  constructor(private commonService: CommonService, private route: ActivatedRoute) {
    this.paginate();
    this.filterProducts();
    this.checkScreenSize();
    
  }
  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        this.category = urlSegments[0].path; // Get 'man' or 'woman' from the URL

        if (this.category === 'man') {
          this.categoryId = 1;
        } else if (this.category === 'woman') {
          this.categoryId = 2;
        } else {
          this.categoryId = 0;
        }

        if (this.categoryId) {
          this.getProducts();
        }
      }
    });
  }
  
  fetchProducts(): void {
    this.commonService.getProducts(this.pageSize, this.currentPage, this.categoryId, this.type, "", "", 0, 0, this.sizeFilter)
      .subscribe((data: Product[]) => {
        this.products = data;
      }, error => {
        console.error("Error fetching products:", error);
      });
  }

  getProducts(): void {
    if (this.categoryId === 1) {
      this.commonService.getMenProducts().subscribe(
        response => {
          this.products = response;
          console.log('Men Products:', this.products);
        },
        error => console.error('Error fetching men’s products:', error)
      );
    } else if (this.categoryId === 2) {
      this.commonService.getWomenProducts().subscribe(
        response => {
          this.products = response;
          console.log('Women Products:', this.products);
        },
        error => console.error('Error fetching women’s products:', error)
      );
    }
  }
  

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.showFilters = window.innerWidth >= 768; // Show filters by default on tablet & web
  }

  isMobile(): boolean {

    return window.innerWidth < 768;
  }

  // markFilterChange() {
  //   this.showResetButton = this.anyFilterSelected();
  //   if (this.isMobile()) {
  //     this.showApplyButton = true;
  //   } else {
  //     this.applyFilters();
  //   }
  // }

  // applyFilters() {
  //   this.filterProducts();
  //   this.showFilters = false; // Close filters on mobile after applying
  //   this.showApplyButton = false;
  // }

  // // applyFilters() {
  // //   this.filterProducts();
  // //   this.showFilters = false; // Close filters after applying
  // //   this.showApplyButton = false;
  // //   this.showResetButton = this.anyFilterSelected(); // Show reset if any filter is applied
  // // }


  // resetFilters() {
  //   this.selectedCategories = {};
  //   this.selectedColors = {};
  //   this.selectedSizes = {};
  //   this.minPrice = 0;
  //   this.maxPrice = 2000;
  //   this.showResetButton = false;
  //   this.applyFilters();
  //   this.updateSliderTrack();
  // }
  // // resetFilters() {
  // //   this.selectedCategories = {};
  // //   this.selectedColors = {};
  // //   this.selectedSizes = {};
  // //   this.minPrice = 0;
  // //   this.maxPrice = 2000;
  // //   this.showResetButton = false; // Hide reset button after reset
  // //   this.applyFilters();
  // //   this.updateSliderTrack();
  // // }

  applyFilters(filters: any) {
    this.showResetButton=true;
    this.selectedCategories = filters.selectedCategories;
    this.selectedColors = filters.selectedColors;
    this.selectedSizes = filters.selectedSizes;
    this.minPrice = filters.minPrice;
    this.maxPrice = filters.maxPrice;
    this.filterProducts();
  }
  
  resetFilters() {
    this.selectedCategories = {};
    this.selectedColors = {};
    this.selectedSizes = {};
    this.minPrice = 0;
    this.maxPrice = 2000;
    this.filterProducts();
  }
  


  anyFilterSelected(): boolean {
    return Object.values(this.selectedCategories).includes(true) ||
           Object.values(this.selectedColors).includes(true) ||
           Object.values(this.selectedSizes).includes(true) ||
           this.minPrice !== 0 ||
           this.maxPrice !== 2000;
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = !Object.values(this.selectedCategories).includes(true) || this.selectedCategories[product.category.name];
      const colorMatch = !Object.values(this.selectedColors).includes(true) || this.selectedColors[product.color];
      const sizeMatch = !Object.values(this.selectedSizes).includes(true) || this.selectedSizes[product.size];
      const priceMatch = product.price >= this.minPrice && product.price <= this.maxPrice;
      return categoryMatch && colorMatch && sizeMatch && priceMatch;
    });

    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  totalPages() {
    return Array(Math.ceil(this.filteredProducts.length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.getProducts();
  }

  toggleFilters() {
    // debugger
    this.showFilters = !this.showFilters;
  }

 
}
