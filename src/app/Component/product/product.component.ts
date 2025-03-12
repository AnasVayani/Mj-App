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
  itemsPerPage: number = 10;
  categoryId: number[] = [];
  type: number = 0;

  categories: number[] = [];
  colors: string[] = [];
  sizes: string[] = [];

  selectedCategories: { [key: number]: boolean } = {};
  selectedColors: { [key: string]: boolean } = {};
  selectedSizes: { [key: string]: boolean } = {};
  minPrice = 0;
  maxPrice = 20000;

  constructor(private router:Router, private commonService : CommonService,  private route: ActivatedRoute,) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.showFilters = window.innerWidth >= 768; // Show filters by default on tablet & web
  }

  ngOnInit(){
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'] ? +params['type'] : 0;
      this.categoryId.push(params['categoryId'] ? +params['categoryId'] : 0);
      this.GetProducts();
    });
   
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

    if (!this.type || !this.categoryId) return;

    this.commonService.getProducts(50, this.currentPage, this.categoryId, this.type, "", "", this.minPrice, this.maxPrice, this.sizes, this.colors).subscribe(
      response =>{
        this.products_response = response
        console.log( "Products Response",this.products_response)
      },
      (err)=>{
        console.log("Fetching Products Error", err)
      }
    )
  }

  resetFilters() {
    this.selectedCategories = {};
    this.selectedColors = {};
    this.selectedSizes = {};
    this.minPrice = 0;
    this.maxPrice = 2000;
    // this.filterProducts();
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

  totalPages() {
    return Array(Math.ceil(1 / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages().length) {
      this.currentPage++;
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
