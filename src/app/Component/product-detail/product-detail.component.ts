import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: any;

  reviews: any = [];

  reviewForm: FormGroup;
  selectedRating = 0;

  selectedImage: string = 'assets/product/product-img.png'; // Default main image

  thumbnails: string[] = [
    'assets/product/product-img.png',
    'assets/product/product-img.png',
    'assets/product/product-img2.png',
    'assets/product/product-img.png',
  ];

  changeImage(image: string) {
    this.selectedImage = image;
  }

  productForm: FormGroup;
  selectedSize: string | null = null;
  quantity: number = 1;

  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state ? (navigation.extras.state as { product: any }).product : null;
    this.selectedImage = this.product.imageUrl[0]
    this.productForm = this.fb.group({
      size: [null],
      quantity: [1],
    });

    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      review: ['', Validators.required],
      rating: [0, Validators.min(1)], // At least 1 star should be selected
    });
    this.getProductReviews();
  }

  setRating(stars: number) {
    this.selectedRating = stars;
    this.reviewForm.patchValue({ rating: stars });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      this.saveProductReview(this.reviewForm)
      this.reviewForm.reset();
      this.selectedRating = 0;
    }
  }



  selectSize(size: string) {
    this.selectedSize = size;
    this.productForm.patchValue({ size });
  }

  increaseQuantity() {
    this.quantity++;
    this.productForm.patchValue({ quantity: this.quantity });
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.productForm.patchValue({ quantity: this.quantity });
    }
  }

  addToCart() {
    if (this.selectedSize) {
      let userId = null
      let userJson = localStorage.getItem('UserContext');
      if (userJson) {
        var user = JSON.parse(userJson)
        userId = user.id
      }
      let guestToken = userId ? null : localStorage.getItem('guestToken');
      const requestData = {
        userId: userId,
        guestToken: guestToken,
        productId: this.product.id,
        quantity: this.productForm.value['quantity'],
        price: this.product.price,
        size: this.selectedSize,
        color: this.product.colour
      };
      this.commonService.addToCart(requestData).subscribe({
        next: res => {
          alert(
            `Added to cart: Size ${this.selectedSize}, Quantity: ${this.quantity}`
          );
        },
        error: err => {
          console.log("Error on addToCart");
        }
      })
    }
  }

  getProductReviews() {
    this.commonService.getProductReviews(this.product.id).subscribe({
      next: res => {
        this.reviews = res
      },
      error: err => {
        console.log("Error on getProductReviews");
      }
    })
  }

  saveProductReview(reviewForm: any) {
    var request = {
      ProductId: this.product.id,
      Name: reviewForm.value.name,
      Rating: this.selectedRating,
      Review: reviewForm.value.review,
      Email: reviewForm.value.email
    }
    // avatar: 'https://randomuser.me/api/portraits/lego/3.jpg', // Default avatar
    this.commonService.saveProductReview(request).subscribe({
      next: res => {
        this.getProductReviews();
      },
      error: err => {
        console.log("Error on getProductReviews");
      }
    })
  }

  formatPostedDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    const formatted = date.toLocaleDateString('en-US', options);
    return formatted;
  }

  getAvatarUrl(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
  }

}
