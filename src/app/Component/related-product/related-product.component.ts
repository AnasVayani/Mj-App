import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {
  @Input() color: string = '';
  relatedProducts: any;

  constructor(private commonService: CommonService, private router:Router) {

  }

  ngOnInit(): void {
    if (this.color) {
      this.getRelatedProductsByColor(this.color);
    }
  }

  getRelatedProductsByColor(color: string) {
    if (!color) {
      return;
    }
    this.commonService.getRelatedProductsByColor(color).subscribe({
      next: res => {
        this.relatedProducts = res
      },
      error: err =>{
        console.log("Error on getRelatedProductsByColor");
      }
    })
  }

  goToProductDetail(id: any) {
    this.commonService.GetProductById(id).subscribe({
      next: res => {
        var product = res
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/product-detail'], { state: { product } });
        });
      },
      error: err => {
        console.log("Error on goToProductDetail");
      }
    })
  }
}
