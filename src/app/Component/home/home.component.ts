import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import KeenSlider,{ KeenSliderInstance } from 'keen-slider';
import { CommonService } from 'src/app/services/commonService';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit,OnDestroy {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  sliderr!: KeenSliderInstance;
  autoplayInterval: any;
  
  
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  countdown: { value: number; label: string }[] = [];

  targetDate: Date = new Date();

  products = [
    {
      name: 'Roadstar',
      description: 'Printed Cotton T-Shirt',
      currentPrice: 38.0,
      oldPrice: 40.0,
      image: './assets/product/product-img.png',
    },
    {
      name: 'Allen Solly',
      description: 'Women Textured Handheld Bag',
      currentPrice: 80.0,
      oldPrice: 100.0,
      image: './assets/product/product-img.png',
    },
    {
      name: 'Louis Philippe Sport',
      description: 'Polo Collar T-Shirt',
      currentPrice: 50.0,
      oldPrice: 65.0,
      image: './assets/product/product-img.png',
    },
    {
      name: 'Adidas',
      description: 'Men adi-dash Running Shoes',
      currentPrice: 60.0,
      oldPrice: 75.0,
      image: './assets/product/product-img.png',
    },
    {
      name: 'Trendyol',
      description: 'Floral Embroidered Maxi Dress',
      currentPrice: 35.0,
      oldPrice: 45.0,
      image: './assets/product/product-img.png',
    },
    {
      name: 'YK Disney',
      description: 'Girls Pink Moana Printed Dress',
      currentPrice: 80.0,
      oldPrice: 100.0,
      image: './assets/product/product-img.png',
    },
    {
      name: 'US Polo',
      description: 'Tailored Cotton Casual Shirt',
      currentPrice: 40.0,
      oldPrice: 50.0,
      image: './assets/product/product-img.png',
    },
    {
      name: 'Zyla',
      description: 'Women Sandals',
      currentPrice: 35.0,
      oldPrice: 40.0,
      image: './assets/product/product-img.png',
    },
  ];

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
    , {
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



  headersSection: any = {}
  bestSelling: any = {}
  dealsSection: any = {}

  constructor(private router: Router, private commonService: CommonService) { }
  ngOnDestroy(): void {
    if (this.sliderr) this.sliderr.destroy();
    clearInterval(this.autoplayInterval);
  
  }


  ngOnInit(): void {
    const selectedCountry = localStorage.getItem('selectedCountry');
    if (!selectedCountry) {
      this.router.navigate(['/select-country']);
    }
    // this.startCountdown();
    this.cloneSlides();
    // debugger;
    this.getDealsBanner();
    this.getSectionHeadings();
    this.getBestSellingProducts();
    this.updateItemsPerPage();
    
    this.isFading = true;
  }


  getSectionHeadings() {
    this.commonService.getBanner().subscribe(
      response => {
        this.headersSection = response;
        console.log('Banner', this.headersSection)
      },
      (err) => {
        console.log("there is an error ", err)
      }

    )
  }

  getDealsBanner() {
    this.commonService.getDealsBanner().subscribe({
      next: (response: any) => {
        this.targetDate = new Date(response.countDown.replace(' ', 'T'));
        this.dealsSection.Title = response.title;
        this.dealsSection.ImageUrl = response.imageUrl;
        this.dealsSection.Description = response.description;
        this.startCountdown();
      },
      error: (err: any) => {
        console.log("there is an error ", err)
      }

    }
    )
  }



  getBestSellingProducts() {
    this.commonService.getBestSeller().subscribe(
      data => {
        this.bestSelling = data;
        console.log("Best Selling Produts ==>", this.bestSelling);
      },
      (err) => {
        console.log("Error Best Selling ==>", err);
      }
    )
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

  // currentIndex = 1; // Start from the first real slide
  transitionEnabled = true;

  ngAfterViewInit() {
    this.updateSlideWidth(); // Adjust width dynamically
    this.sliderr = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      slides: {
        perView: 1.2,
        spacing: 10,
      },
      breakpoints: {
        '(min-width: 576px)': {
          slides: { perView: 2.2, spacing: 10 },
        },
        '(min-width: 768px)': {
          slides: { perView: 3.2, spacing: 10 },
        },
        '(min-width: 992px)': {
          slides: { perView: 4.2, spacing: 10 },
        },
      },
    });

    this.startAutoPlay();

  }
  startAutoPlay() {
    this.autoplayInterval = setInterval(() => {
      if (this.sliderr) {
        this.sliderr.moveToIdx(this.sliderr.track.details.abs + 1, true);
      }
    }, 2000);
  }
  pause() {
    clearInterval(this.autoplayInterval);
  }

  resume() {
    this.startAutoPlay();
  }

  @HostListener('window:resize')
  updateSlideWidth() {
    if (this.slider) {
      this.moveSlide();
    }
  }

  cloneSlides() {
    // Clone first and last slides for smooth infinite effect
    const firstClone = { ...this.reviews[0] };
    const lastClone = { ...this.reviews[this.reviews.length - 1] };

    this.reviews = [lastClone, ...this.reviews, firstClone];
  }

  // prevSlide() {
  //   if (!this.transitionEnabled) return;

  //   this.currentIndex--;
  //   this.moveSlide();

  //   if (this.currentIndex === 0) {
  //     setTimeout(() => {
  //       this.transitionEnabled = false;
  //       this.currentIndex = this.reviews.length - 2; // Move to last real slide instantly
  //       this.moveSlide();
  //       setTimeout(() => (this.transitionEnabled = true), 50);
  //     }, 500);
  //   }
  // }

  // nextSlide() {
  //   if (!this.transitionEnabled) return;

  //   this.currentIndex++;
  //   this.moveSlide();

  //   if (this.currentIndex === this.reviews.length - 1) {
  //     setTimeout(() => {
  //       this.transitionEnabled = false;
  //       this.currentIndex = 1; // Move back to first real slide instantly
  //       this.moveSlide();
  //       setTimeout(() => (this.transitionEnabled = true), 50);
  //     }, 500);
  //   }
  // }

  moveSlide() {
    const sliderElement = this.slider.nativeElement;
    const slideWidth = sliderElement.children[0].clientWidth;
    sliderElement.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }
  // bestSellers = [
  //   {
  //     title: 'Tailored Stretch',
  //     subtitle: 'Turn It Up Pants',
  //     price: 12,
  //     image: 'assets/images/product1.jpg',
  //     colors: ['#000000', '#1a374d', '#cccccc'],
  //   },
  //   {
  //     title: 'Technical Silk',
  //     subtitle: 'Make A Splash',
  //     price: 12,
  //     image: 'assets/images/product2.jpg',
  //     colors: ['#26355d', '#e0a800', '#000000'],
  //   },
  //   {
  //     title: 'Cool Weave',
  //     subtitle: 'Anywhere Dress',
  //     price: 12,
  //     image: 'assets/images/product3.jpg',
  //     colors: ['#d5aaff', '#79956e', '#72865a'],
  //   },
  // ];
  
  LatestDeal=[
    {
      title: 'Sunday',
      liked: false,
      
    },
    {
      title: 'Monday',
      liked: true,
      
    },
    {
      title: 'Tuesday',
      liked: false,
      
    },
    {
      title: 'Wednesday',
      liked: false,
      
    },
    {
      title: 'Thursday',
      liked: false,
      
    },
    {
      title: 'Friday',
      liked: false,
      
    },
    {
      title: 'Saturday',
      liked: false,
      
    },
  ]
  
  bestSellers = [
    {
      title: 'Tailored Stretch',
      subtitle: 'Turn It Up Pants',
      price: 12,
      liked: false,
      colors: ['#000000', '#1a374d', '#cccccc'],
    },
    {
      title: 'Technical Silk',
      subtitle: 'Make A Splash',
      price: 12,
      liked: false,
      colors: ['#26355d', '#e0a800', '#000000'],
    },
    {
      title: 'Cool Weave',
      subtitle: 'Anywhere Dress',
      price: 12,
      liked: false,
      colors: ['#d5aaff', '#79956e', '#72865a'],
    },
  ];

  toggleLike(index: number) {
    this.bestSellers[index].liked = !this.bestSellers[index].liked;
  }
  toggleLikeLatest(index: number) {
    this.LatestDeal[index].liked = !this.LatestDeal[index].liked;
  }
  collection = [
    { image: 'assets/images/casual.jpg', label: 'Casual' },
    { image: 'assets/images/kurta.jpg', label: 'Kurta' },
    { image: 'assets/images/festive.jpg', label: 'Festive Wear' },
    { image: 'assets/images/ethnic.jpg', label: 'Ethnic Wear' }
  ];

  testimonials = [
    {
      name: 'John Doe',
      role: 'Marketing Manager',
      message: 'This platform is incredibly intuitive and efficient, streamlining our workflow and boosting productivity. A must-have for any team!',
      color: '#7B61FF',
      image: 'https://i.pravatar.cc/50?img=1'
    },
    {
      name: 'Emily Smith',
      role: 'Project Manager',
      message: 'User-friendly and feature-rich, it has transformed our operations, making tasks seamless and efficient. Highly recommended!',
      color: '#3DBE8B',
      image: 'https://i.pravatar.cc/50?img=2'
    },
    {
      name: 'Michael Johnson',
      role: 'Sales Head',
      message: 'A game-changer for our sales team! Easy to use, reliable, and packed with great features that enhance efficiency and collaboration.',
      color: '#F7C32E',
      image: 'https://i.pravatar.cc/50?img=3'
    },
    {
      name: 'Sarah Lee',
      role: 'HR Manager',
      message: 'Helped us boost our employee engagement and automate repetitive tasks with ease. Brilliant UI too!',
      color: '#FF6F61',
      image: 'https://i.pravatar.cc/50?img=4'
    },
    {
      name: 'David Kim',
      role: 'Tech Lead',
      message: 'I love the simplicity and speed. It integrates smoothly with our systems.',
      color: '#00B8D9',
      image: 'https://i.pravatar.cc/50?img=5'
    },
    {
      name: 'Ayesha Malik',
      role: 'UX Designer',
      message: 'Perfectly meets the expectations. Simple, clean and powerful!',
      color: '#9C27B0',
      image: 'https://i.pravatar.cc/50?img=6'
    }
  ];

  currentIndex = 0;
  itemsPerPage = 3;
  isFading = false;

  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerPage();
  }

  updateItemsPerPage() {
    const width = window.innerWidth;
    if (width < 576) {
      this.itemsPerPage = 1;
    } else if (width < 768) {
      this.itemsPerPage = 2;
    } else {
      this.itemsPerPage = 3;
    }
    // Adjust currentIndex to avoid overflow
    if (this.currentIndex + this.itemsPerPage > this.testimonials.length) {
      this.currentIndex = Math.max(0, this.testimonials.length - this.itemsPerPage);
    }
  }

  get visibleTestimonials() {
    return this.testimonials.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  nextSlide() {
    if (this.currentIndex + this.itemsPerPage < this.testimonials.length) {
      this.triggerFade(() => {
        this.currentIndex += this.itemsPerPage;
        
      });
    }
  }

  prevSlide() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.triggerFade(() => {
        this.currentIndex -= this.itemsPerPage;
        
      });
    }
  }
  triggerFade(callback: () => void) {
    this.isFading = false;
    setTimeout(() => {
      callback();
      this.isFading = true;
    }, 300); // slight delay to restart the animation
  }

  goToProductDetail(productId: number) {
    this.commonService.GetProductById(productId).subscribe({
      next: res => {
        this.router.navigate(['/product-detail'], {
          state: {
            product: res,
          }
        });
      },
      error: err => {
        console.log('Error goToProductDetail');
      }
    })
  }
}
