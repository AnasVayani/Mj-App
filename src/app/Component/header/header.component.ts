import { Component, HostListener, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

interface Category {
  id: number;
  name: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menCategories: Category[] = [];
  womenCategories: Category[] = [];
  
  constructor(private commonService: CommonService){}
  ngOnInit(): void {
    debugger;
    this.getAllCategories()
    throw new Error('Method not implemented.');
  }
  mobileMenuActive = false;
  dropdownActive = false;
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
