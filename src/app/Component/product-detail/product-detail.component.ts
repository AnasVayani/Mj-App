import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  // product: any;

  // constructor(private router: Router) {
  //   const navigation = this.router.getCurrentNavigation();
  //   this.product = navigation?.extras.state ? (navigation.extras.state as { product: any }).product : null;
  // }
  reviews = [
    {
      name: 'Mark Williams',
      rating: 5,
      comment: 'Excellent Product, I Love It 😍',
      date: 'June 05, 2023',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Alexa Johnson',
      rating: 5,
      comment: 'My Daughter is very much happy with this product',
      date: 'June 05, 2023',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

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

  constructor(private fb: FormBuilder) {
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
  }

  setRating(stars: number) {
    this.selectedRating = stars;
    this.reviewForm.patchValue({ rating: stars });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      this.reviews.push({
        name: this.reviewForm.value.name,
        rating: this.selectedRating,
        comment: this.reviewForm.value.review,
        date: new Date().toLocaleDateString(),
        avatar: 'https://randomuser.me/api/portraits/lego/3.jpg', // Default avatar
      });

      // Reset form after submission
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
      alert(
        `Added to cart: Size ${this.selectedSize}, Quantity: ${this.quantity}`
      );
    }
  }
}
