import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blogs = [
    {
      title: 'Embracing Tradition with Modern Flair',
      slug: 'embracing-tradition-with-modern-flair',
      excerpt:
        'The shalwar kameez, a quintessential attire in South Asian fashion, has gracefully evolved over the years...',
      image: 'assets/images/home-banner.png',
    },

    {
      title: 'The Cultural Significance of Traditional Pakistani Attire',
      slug: 'cultural-significance-pakistani-attire',
      excerpt:
        'Traditional Pakistani attire, like the shalwar kameez, holds deep cultural value...',
      image: 'assets/product/product-img.png',
    },

    {
      title: "The Evolution of Men's Shalwar Kameez: Trends to Watch in 2025",
      slug: 'evolution-of-mens-shalwar-kameez',
      excerpt:
        'The shalwar kameez, a staple in South Asian attire, has undergone significant transformations over the years...',
      image: 'assets/product/product-img.png',
    },

    {
      title: "Styling Men's Shalwar Kameez for Various Occasions",
      slug: 'styling-mens-shalwar-kameez-for-various-occasions',
      excerpt:
        'The versatility of the shalwar kameez makes it suitable for a wide range of occasions...',
      image: 'assets/product/product-img.png',
    },

    {
      title: "The Art of Accessorizing Men's Shalwar Kameez: Elevate Your Traditional Attire",
      slug: 'art-of-accessorizing-mens-shalwar-kameez',
      excerpt:
        'The shalwar kameez is a timeless ensemble that embodies the rich cultural heritage of South Asia...',
      image: 'assets/product/product-img.png',
    },

    {
      title: "The Influence of Regional Styles on Men's Shalwar Kameez Designs",
      slug: 'influence-of-regional-styles',
      excerpt:
        'The shalwar kameez, a quintessential South Asian attire, exhibits a rich tapestry of regional variations...',
      image: 'assets/product/product-img.png',
    },

  ];

  constructor(private router: Router) {}

  navigateToBlog(slug: string) {
    this.router.navigate(['/blog', slug]);
  }
}
