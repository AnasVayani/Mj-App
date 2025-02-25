import { Component } from '@angular/core';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent {
  relatedProducts = [
    {
      image: 'assets/product/product-img.png',
      title: 'US Polo',
      subtitle: 'Tailored Cotton Casual Shirt',
      currentPrice: 40.00,
      oldPrice: 50.00
    },
    {
      image: 'assets/product/product-img.png',
      title: 'Roadstar',
      subtitle: 'Printed Blazer for Men',
      currentPrice: 60.00,
      oldPrice: 70.00
    },
    {
      image: 'assets/product/product-img.png',
      title: 'YK Disney',
      subtitle: 'Red Printed T-Shirt',
      currentPrice: 30.00,
      oldPrice: 35.00
    },
    {
      image: 'assets/product/product-img.png',
      title: 'Flora',
      subtitle: 'Leather Hand Purse',
      currentPrice: 35.00,
      oldPrice: 45.00
    }
  ];
}
