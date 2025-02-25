import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  name: string;
  desc: string;
  image: string;
  price: number;
  oldPrice: number;
  category: string;
  color: string;
  size: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  showFilters: boolean = true;
  screenWidth: number = window.innerWidth; // Store screen width
  showApplyButton: boolean = false;
  showResetButton: boolean = false;

  products: Product[] = [
    {
      name: 'Allen Solly',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 80,
      oldPrice: 100,
      category: 'Men',
      color: 'Red',
      size: 'M',
    },
    {
      name: 'Adidas Shoes',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 60,
      oldPrice: 75,
      category: 'Men',
      color: 'Blue',
      size: 'L',
    },
    {
      name: 'Roadstar T-Shirt',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 38,
      oldPrice: 40,
      category: 'Men',
      color: 'Black',
      size: 'XL',
    },
    {
      name: 'Flora Hand Purse',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 35,
      oldPrice: 45,
      category: 'Women',
      color: 'Orange',
      size: 'M',
    },
    {
      name: 'Nike Hoodie',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 55,
      oldPrice: 65,
      category: 'Men',
      color: 'Green',
      size: 'L',
    },
    {
      name: 'Puma Jacket',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 90,
      oldPrice: 120,
      category: 'Men',
      color: 'Black',
      size: 'M',
    },
    {
      name: 'Levi’s Jeans',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 70,
      oldPrice: 90,
      category: 'Men',
      color: 'Blue',
      size: 'L',
    },
    {
      name: 'H&M Dress',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 100,
      oldPrice: 150,
      category: 'Women',
      color: 'Red',
      size: 'S',
    },
    {
      name: 'Gucci Belt',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 120,
      oldPrice: 160,
      category: 'Bags',
      color: 'Black',
      size: 'M',
    },
    {
      name: 'LV Handbag',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 250,
      oldPrice: 300,
      category: 'Women',
      color: 'Brown',
      size: 'L',
    },
    {
      name: 'Ray-Ban Sunglasses',
      desc: 'lorem',
      image: 'assets/product/product-img.png',
      price: 85,
      oldPrice: 95,
      category: 'Men',
      color: 'Black',
      size: 'M',
    },
  ];

  filteredProducts: Product[] = [...this.products];
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  categories: string[] = ['Men', 'Women', 'Kids', 'Bags', 'Belts'];
  colors: string[] = ['Red', 'Blue', 'Orange', 'Black', 'Green', 'Yellow'];
  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];

  selectedCategories: { [key: string]: boolean } = {};
  selectedColors: { [key: string]: boolean } = {};
  selectedSizes: { [key: string]: boolean } = {};
  minPrice = 0;
  maxPrice = 2000;

  constructor(private router:Router) {
    this.paginate();
    this.filterProducts();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.showFilters = window.innerWidth >= 768; // Show filters by default on tablet & web
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  applyFilters(filters: any) {
    this.showResetButton = true;
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
    return (
      Object.values(this.selectedCategories).includes(true) ||
      Object.values(this.selectedColors).includes(true) ||
      Object.values(this.selectedSizes).includes(true) ||
      this.minPrice !== 0 ||
      this.maxPrice !== 2000
    );
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const categoryMatch =
        !Object.values(this.selectedCategories).includes(true) ||
        this.selectedCategories[product.category];
      const colorMatch =
        !Object.values(this.selectedColors).includes(true) ||
        this.selectedColors[product.color];
      const sizeMatch =
        !Object.values(this.selectedSizes).includes(true) ||
        this.selectedSizes[product.size];
      const priceMatch =
        product.price >= this.minPrice && product.price <= this.maxPrice;
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

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages().length) {
      this.currentPage++;
      this.paginate();
    }
  }

  toggleFilters() {
    // debugger
    this.showFilters = !this.showFilters;
  }

  goToProductDetail(product: any) {
    this.router.navigate(['/product-detail'], { state: { product } });
  }
}
