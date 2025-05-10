import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filtersUpdated = new EventEmitter<any>();
  @Output() filtersReset = new EventEmitter<void>();
  @Input() showFilters: boolean = false; // Receive state from parent
  @Input() showResetButton: boolean = false; // Receive state from parent

  // showFilters: boolean = true;
  showApplyButton: boolean = false;
  // showResetButton: boolean = false;

  categories: any;
  colors: string[] = ['White', 'Blue', 'Brown', 'Black', 'Grey', 'Red'];
  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];

  selectedCategories: { [key: number]: boolean } = {};
  selectedColors: { [key: string]: boolean } = {};
  selectedSizes: { [key: string]: boolean } = {};
  minPrice = 0;
  maxPrice = 20000;
  type: number = 0;
  paramCategoryId: number = 0;
  isAllCategory: boolean = false;

  /**
   *
   */
  constructor(private _commonService: CommonService, private route: ActivatedRoute ) {

  }

  ngOnInit(): void {
    const state = history.state;
      this.type = state && state['type'] ? state['type'] : null;
      this.paramCategoryId = state && state['categoryId'] ? state['categoryId'] : 0
      if (this.paramCategoryId) {
        this.selectedCategories[this.paramCategoryId] = true;
      }
      if (this.type != null && this.type != 0) {
        this.isAllCategory = false
        this.getCategoriesByType()
      }
      else {
        this.isAllCategory = true
        this.getAllCategories();
      }
    this.updateSliderTrack();
  }
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  markFilterChange() {
    this.showResetButton = this.anyFilterSelected();
    if (this.isMobile()) {
      this.showApplyButton = true;
    } else {
      this.applyFilters();
    }
  }

  applyFilters() {
    this.showFilters = false;
    this.showApplyButton = false;
    this.showResetButton = this.anyFilterSelected();
    this.filtersUpdated.emit({
      selectedCategories: this.selectedCategories,
      selectedColors: this.selectedColors,
      selectedSizes: this.selectedSizes,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
  }

  resetFilters() {
    this.selectedCategories = {};
    this.selectedCategories[this.paramCategoryId] = true;
    this.selectedColors = {};
    this.selectedSizes = {};
    this.minPrice = 0;
    this.maxPrice = 20000;
    this.showResetButton = false;
    this.filtersReset.emit();
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

  updatePriceRange() {
    if (this.minPrice > this.maxPrice) {
      let temp = this.minPrice;
      this.minPrice = this.maxPrice;
      this.maxPrice = temp;
    }
    this.updateSliderTrack();
    this.markFilterChange();
  }

  updateSliderTrack() {
    const minPercent = (this.minPrice / 20000) * 100;
    const maxPercent = (this.maxPrice / 20000) * 100;

    const sliderTrack = document.querySelector('.slider-track') as HTMLElement;
    if (sliderTrack) {
      sliderTrack.style.background = `linear-gradient(to right, #ddd ${minPercent}%, #333 ${minPercent}%, #333 ${maxPercent}%, #ddd ${maxPercent}%)`;
    }
  }

  getCategoriesByType(){
    this._commonService.getCategoriesByType(this.type).subscribe({
      next: res => {
        this.categories = res;
      },
      error: err => {
        console.log('error on getCategoriesByType')
      }
    })
  }

  getAllCategories(){
    this._commonService.getAll().subscribe({
      next: res => {
        this.categories = [];
        this.categories = res;
      },
      error: err => {
        console.log('error on getAllCategories')
      }
    })
  }

  hasActiveFilters(): boolean {
    return (
      this.getSelectedCategoryIds().length > 0 ||
      this.getSelectedColors().length > 0 ||
      this.getSelectedSizes().length > 0 ||
      this.minPrice !== 0 || this.maxPrice !== 20000
    );
  }
  
  getSelectedCategoryIds(): number[] {
    return Object.keys(this.selectedCategories)
      .filter(key => this.selectedCategories[+key])
      .map(id => +id);
  }
  
  getCategoryNameById(id: number): string {
    const category = this.categories.find((c: any) => c.id === id);
    return category ? category.name : '';
  }
  
  removeCategory(id: number) {
    this.selectedCategories[id] = false;
    this.markFilterChange();
  }
  
  getSelectedColors(): string[] {
    return Object.keys(this.selectedColors).filter(color => this.selectedColors[color]);
  }
  
  removeColor(color: string) {
    this.selectedColors[color] = false;
    this.markFilterChange();
  }
  
  getSelectedSizes(): string[] {
    return Object.keys(this.selectedSizes).filter(size => this.selectedSizes[size]);
  }
  
  removeSize(size: string) {
    this.selectedSizes[size] = false;
    this.markFilterChange();
  }
  
  resetPrice() {
    this.minPrice = 0;
    this.maxPrice = 20000;
    this.updatePriceRange();
  }
}
