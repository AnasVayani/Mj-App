import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';


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
  products_response: any ={};

  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  categoryId: number[] = [];
  type: number | null = 0;

  categories: number[] = [];
  colors: string[] = [];
  sizes: string[] = [];

  selectedCategories: { [key: number]: boolean } = {};
  selectedColors: { [key: string]: boolean } = {};
  selectedSizes: { [key: string]: boolean } = {};
  minPrice = 0;
  maxPrice = 20000;
  paramCategoryId: number = 0;
  totalCount: any;
  totalPagesCount: number = 0;

  constructor(private router:Router, private commonService : CommonService,  private route: ActivatedRoute,) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.showFilters = window.innerWidth >= 768; // Show filters by default on tablet & web
  }

  ngOnInit(){
    const state = history.state;
      this.categoryId = [];
      this.type = state && state['type'] ? state['type'] : null;
      this.paramCategoryId = state && state['categoryId'] ? state['categoryId'] : 0
      if (state && state['categoryId']) {
        this.categoryId.push(state['categoryId']);
      }
      this.GetProducts();
  }
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  applyFilters(filters: any) {
    this.showResetButton = true;
  
    this.selectedCategories = filters.selectedCategories
    this.selectedColors = filters.selectedColors
    this.selectedSizes = filters.selectedSizes

    this.categoryId = Object.keys(this.selectedCategories)
    .filter((id: any) => this.selectedCategories[id])
    .map((id) => Number(id));

    this.colors = Object.keys(this.selectedColors)
    .filter((id: any) => this.selectedColors[id]);
    this.sizes = Object.keys(this.selectedSizes)
    .filter((id: any) => this.selectedSizes[id]);
    this.minPrice = filters.minPrice;
    this.maxPrice = filters.maxPrice;
    this.GetProducts();
  }
  

  GetProducts(){
    this.commonService.getProducts(this.itemsPerPage, this.currentPage, this.categoryId, this.type, "", "", this.minPrice, this.maxPrice, this.sizes, this.colors).subscribe(
      response =>{
        this.products_response = response.items
        this.totalCount = response.totalCount;
        this.totalPagesCount = Math.ceil(this.totalCount / this.itemsPerPage);
        console.log( "Products Response",this.products_response)
      },
      (err)=>{
        console.log("Fetching Products Error", err)
      }
    )
  }

  resetFilters() {
    this.selectedCategories[this.paramCategoryId] = true;
    this.selectedColors = {};
    this.selectedSizes = {};
    this.minPrice = 0;
    this.maxPrice = 20000;
    this.categoryId = [];
    this.categoryId.push(this.paramCategoryId)
    this.colors = []
    this.sizes = []
    this.GetProducts();
  }

  anyFilterSelected(): boolean {
    return (
      Object.values(this.selectedCategories).includes(true) ||
      Object.values(this.selectedColors).includes(true) ||
      Object.values(this.selectedSizes).includes(true) ||
      this.minPrice !== 0 ||
      this.maxPrice !== 20000
    );
  }

  totalPages() {
    return Array(this.totalPagesCount)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.GetProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.GetProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPagesCount) {
      this.currentPage++;
      this.GetProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleFilters() {
    // debugger
    this.showFilters = !this.showFilters;
  }

  goToProductDetail(product: any) {
    this.router.navigate(['/product-detail'], { state: { product } });
  }
  toggleLike(index: number) {
    // liked logic
  }

  addToWishlist(productId: number) {
    this.commonService.addToWishlist(productId).subscribe({
      next: res => {
        this.GetProducts();
      },
      error: err => {
        alert("wishlist failed")
      }
    })
  }
}
