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

  /**
   *
   */
  constructor(private _commonService: CommonService, private route: ActivatedRoute ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        this.type = params['type'] ? +params['type'] : 0;
        this.paramCategoryId = params['categoryId'] ? +params['categoryId'] : 0
        this.selectedCategories[params['categoryId'] ? +params['categoryId'] : 0] = true;
        if (this.type != null && this.type != 0) {
          this.getCategoriesByType()
        }
      }
    })
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
}
