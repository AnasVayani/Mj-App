import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/commonService';


interface Product {
  id: number;
  name: string;
  type: string;
  hashTag: string;
  desc: string;
  discount: number;
  imageUrl: string[];
  price: number;
  oldPrice: number;
  category: {
    id: number;
    name: string;
  };
  color: string;
  size: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit,AfterViewInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  countdown: { value: number; label: string }[] = [];

  targetDate: Date = new Date(new Date().getTime() + 120 * 24 * 60 * 60 * 1000); // 120 Days from now
  
  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 1;
  categoryId: number = 1; // Example category ID for T-Shirts
  type: number = 1; // Example type filter
  sizeFilter: string = ''; // If you want to filter by size
  // products = [
  //   {
  //     name: 'Roadstar',
  //     description: 'Printed Cotton T-Shirt',
  //     currentPrice: 38.0,
  //     oldPrice: 40.0,
  //     image: './assets/product/product-img.png',
  //   },
  //   {
  //     name: 'Allen Solly',
  //     description: 'Women Textured Handheld Bag',
  //     currentPrice: 80.0,
  //     oldPrice: 100.0,
  //     image: './assets/product/product-img.png',
  //   },
  //   {
  //     name: 'Louis Philippe Sport',
  //     description: 'Polo Collar T-Shirt',
  //     currentPrice: 50.0,
  //     oldPrice: 65.0,
  //     image: './assets/product/product-img.png',
  //   },
  //   {
  //     name: 'Adidas',
  //     description: 'Men adi-dash Running Shoes',
  //     currentPrice: 60.0,
  //     oldPrice: 75.0,
  //     image: './assets/product/product-img.png',
  //   },
  //   {
  //     name: 'Trendyol',
  //     description: 'Floral Embroidered Maxi Dress',
  //     currentPrice: 35.0,
  //     oldPrice: 45.0,
  //     image: './assets/product/product-img.png',
  //   },
  //   {
  //     name: 'YK Disney',
  //     description: 'Girls Pink Moana Printed Dress',
  //     currentPrice: 80.0,
  //     oldPrice: 100.0,
  //     image: './assets/product/product-img.png',
  //   },
  //   {
  //     name: 'US Polo',
  //     description: 'Tailored Cotton Casual Shirt',
  //     currentPrice: 40.0,
  //     oldPrice: 50.0,
  //     image: './assets/product/product-img.png',
  //   },
  //   {
  //     name: 'Zyla',
  //     description: 'Women Sandals',
  //     currentPrice: 35.0,
  //     oldPrice: 40.0,
  //     image: './assets/product/product-img.png',
  //   },
  // ];
  constructor(private _commonService: CommonService, private route: ActivatedRoute) {}
  reviews = [ 
    {
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      name: 'Leslie Alexander',
      role: 'Model',
      image: './assets/images/user1.jpg'
    },
    {
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      name: 'Jacob Jones',
      role: 'Co-Founder',
      image: './assets/images/user2.jpg'
    },
    {
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      name: 'Jenny Wilson',
      role: 'Fashion Designer',
      image: './assets/images/user3.jpg'
    },
    {
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      name: 'Leslie Alexander',
      role: 'Model',
      image: './assets/images/user1.jpg'
    },
    {
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      name: 'Leslie Alexander',
      role: 'Model',
      image: './assets/images/user1.jpg'
    }
    ,{
      text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.',
      name: 'Leslie Alexander',
      role: 'Model',
      image: './assets/images/user1.jpg'
    }
  ];

  stories = [
    'assets/product/product-img.png',
    'assets/product/product-img.png',
    'assets/product/product-img.png',
    'assets/product/product-img.png',
  ];
  commonService: any;
  ngOnInit(): void {
    this.fetchProducts();
    this.startCountdown();
  }


  fetchProducts(): void {
    this._commonService.getProducts(this.pageSize, this.currentPage, this.categoryId, this.type, "", "", 0, 0, this.sizeFilter)
      .subscribe((data: Product[]) => {
        this.products = data;
        console.log(this.products)
      }, (error: any) => {
        console.error("Error fetching products:", error);
      });
  }
  startCountdown(): void {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countdown = [
        { value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Mins' },
        { value: seconds, label: 'Secs' },
      ];
    }, 1000);
  }

  currentIndex = 1; // Start from the first real slide
  transitionEnabled = true;

  ngAfterViewInit() {
    this.cloneSlides();
  }

  cloneSlides() {
    // Clone first and last slides for smooth infinite effect
    const firstClone = { ...this.reviews[0] };
    const lastClone = { ...this.reviews[this.reviews.length - 1] };
    
    this.reviews = [lastClone, ...this.reviews, firstClone];
  }

  prevSlide() {
    if (!this.transitionEnabled) return;

    this.currentIndex--;
    this.moveSlide();

    if (this.currentIndex === 0) {
      setTimeout(() => {
        this.transitionEnabled = false;
        this.currentIndex = this.reviews.length - 2; // Move to last real slide instantly
        this.moveSlide();
        setTimeout(() => (this.transitionEnabled = true), 50);
      }, 500);
    }
  }

  nextSlide() {
    if (!this.transitionEnabled) return;

    this.currentIndex++;
    this.moveSlide();

    if (this.currentIndex === this.reviews.length - 1) {
      setTimeout(() => {
        this.transitionEnabled = false;
        this.currentIndex = 1; // Move back to first real slide instantly
        this.moveSlide();
        setTimeout(() => (this.transitionEnabled = true), 50);
      }, 500);
    }
  }

  moveSlide() {
    const sliderElement = this.slider.nativeElement;
    const slideWidth = sliderElement.children[0].clientWidth;
    sliderElement.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }
}
