// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-blog-detail',
//   templateUrl: './blog-detail.component.html',
//   styleUrls: ['./blog-detail.component.scss'],
// })
// export class BlogDetailComponent implements OnInit {
//   blogs: any = {
//     'embracing-tradition-with-modern-flair': {
//       title: "Embracing Tradition with Modern Flair",
//       bannerImage: 'assets/banner/banner.png',
//       content: [
//         { type: 'heading1', text: 'Introduction' },
//         { type: 'paragraph1', text: 'The shalwar kameez, a quintessential attire in South Asian fashion, has gracefully evolved over the years.' },
//         { type: 'heading2', text: 'Modern Adaptations' },
//         { type: 'paragraph2', text: 'Fashion designers are merging traditional styles with modern aesthetics to cater to younger generations.' },
//         { type: 'list', items: ['Slimmer cuts and fitted designs', 'Fusion with Western styles', 'Sustainable fabric choices'] },

//       ],
//     },

//     'cultural-significance-pakistani-attire': {
//       title: 'The Cultural Significance of Traditional Pakistani Attire',
//       bannerImage: 'assets/banner/banner.png',
//       content: [
//         { type: 'heading', text: 'Why Traditional Attire Matters' },
//         { type: 'paragraph', text: 'Traditional Pakistani attire, like the shalwar kameez, holds deep cultural value and identity.' },
//         { type: 'list', items: ['Represents heritage', 'Comfortable in all seasons', 'Enhances cultural pride'] },
//         { type: 'paragraph', text: 'Embracing tradition helps keep cultural roots alive in modern times.' },
//       ],
//     },

//     'evolution-of-mens-shalwar-kameez': {
//       title: "The Evolution of Men's Shalwar Kameez: Trends to Watch in 2025",
//       bannerImage: 'assets/banner/banner.png',
//       content: [
//         { type: 'heading', text: 'Introduction' },
//         { type: 'paragraph', text: 'The shalwar kameez, a staple in South Asian attire, has undergone significant transformations over the years.' },
//         { type: 'heading', text: 'Trends in 2025' },
//         { type: 'list', items: ['Slim-fit designs', 'Embroidered collars', 'Fusion with modern cuts'] },
//         { type: 'paragraph', text: 'The shalwar kameez continues to evolve while retaining its cultural essence.' },
//       ],
//     },

//     'styling-mens-shalwar-kameez-for-various-occasions': {
//       title: "Styling Men's Shalwar Kameez for Various Occasions",
//       bannerImage: 'assets/banner/banner.png',
//       content: [
//         { type: 'heading', text: 'Casual Wear' },
//         { type: 'paragraph', text: 'For casual outings, a simple cotton shalwar kameez paired with loafers works best.' },
//         { type: 'heading', text: 'Formal Occasions' },
//         { type: 'list', items: ['Silk or embroidered designs', 'Classic waistcoats', 'Polished leather shoes'] },
//         { type: 'paragraph', text: 'The versatility of the shalwar kameez makes it suitable for a wide range of occasions.' },
//       ],
//     },

//     'art-of-accessorizing-mens-shalwar-kameez': {
//       title: "The Art of Accessorizing Men's Shalwar Kameez: Elevate Your Traditional Attire",
//       bannerImage: 'assets/banner/banner.png',
//       content: [
//         { type: 'heading', text: 'Essential Accessories' },
//         { type: 'paragraph', text: 'A shalwar kameez outfit can be enhanced with the right accessories.' },
//         { type: 'list', items: ['Embroidered shawls', 'Classic waistcoats', 'Stylish khussa shoes'] },
//         { type: 'paragraph', text: 'Accessories add a touch of personality and cultural depth to traditional wear.' },
//       ],
//     },

//     'influence-of-regional-styles': {
//       title: "The Influence of Regional Styles on Men's Shalwar Kameez Designs",
//       bannerImage: 'assets/banner/banner.png',
//       content: [
//         { type: 'heading', text: 'Regional Variations' },
//         { type: 'paragraph', text: 'The shalwar kameez exhibits a rich tapestry of regional variations across Pakistan.' },
//         { type: 'list', items: ['Sindhi Ajrak & embroidered waistcoats', 'Balochi wide-legged shalwar designs', 'Punjabi vibrant colored styles'] },
//         { type: 'paragraph', text: 'These regional styles reflect the diversity and cultural richness of Pakistani fashion.' },
//       ],
//     },
//   };

//   blog: any = null;

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     const slug = this.route.snapshot.paramMap.get('slug');
//     if (slug && this.blogs[slug]) {
//       this.blog = this.blogs[slug];
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface BlogSection {
  type: string;
  text?: string;
  link?: string;
  items?: string[];
}

interface Blog {
  title: string;
  bannerImage: string;
  content: BlogSection[];
}

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  blogs: Record<string, Blog> = {
    'embracing-tradition-with-modern-flair': {
      title:
        "Embracing Tradition with Modern Flair: The Evolution of Men's Shalwar Kameez in 2025",
      bannerImage: 'assets/banner/banner.png',
      content: [
        { type: 'heading', text: 'Introduction' },
        {
          type: 'paragraph',
          text: 'The shalwar kameez, a quintessential attire in South Asian fashion, has gracefully evolved over the years. In 2025, this traditional ensemble seamlessly blends heritage with contemporary trends, offering men a versatile and stylish option for various occasions.',
        },

        { type: 'heading', text: 'The Rise of Fusion Wear' },
        {
          type: 'paragraph',
          text: 'One of the prominent trends in 2025 is fusion wear, which combines traditional elements with modern aesthetics. Designers are reimagining the classic shalwar kameez by incorporating Western cuts and styles. For instance, pairing a traditional kameez with tailored trousers or adding modern embellishments has become increasingly popular. ',
          link: 'https://chicophicial.com/blogs/events/top-pakistani-clothing-trends-to-follow-in-2025?srsltid=AfmBOopAcis7dbWcY3bzyF5mOtVNqbTH5ekB3bKD0XW-hXHmdQmLT-36	',
        },

        { type: 'heading', text: 'Contemporary Color Palettes and Fabrics' },
        {
          type: 'paragraph',
          text: "This year, there's a noticeable shift towards earthy tones and muted colors, moving away from the conventional bright hues. Fabrics like Cotton Karandi are favored for their comfort and breathability, making them ideal for both casual and formal wear. ",
          link: 'https://chicophicial.com/blogs/events/top-pakistani-clothing-trends-to-follow-in-2025?srsltid=AfmBOopAcis7dbWcY3bzyF5mOtVNqbTH5ekB3bKD0XW-hXHmdQmLT-36	',
        },

        { type: 'heading', text: 'Embroidered Elegance' },
        {
          type: 'paragraph',
          text: 'Embroidery continues to play a significant role in enhancing the aesthetic appeal of the shalwar kameez. Intricate patterns on collars and plackets add a touch of sophistication, making the attire suitable for festive occasions and weddings.',
          link: 'https://chicophicial.com/blogs/events/top-pakistani-clothing-trends-to-follow-in-2025?srsltid=AfmBOopAcis7dbWcY3bzyF5mOtVNqbTH5ekB3bKD0XW-hXHmdQmLT-36	',
        },

        { type: 'heading', text: 'Conclusion' },
        {
          type: 'paragraph',
          text: 'The shalwar kameez in 2025 exemplifies a harmonious blend of tradition and modernity. By embracing contemporary trends while honoring cultural roots, this attire remains a timeless choice for the modern man.',
        },
      ],
    },
    'cultural-significance-pakistani-attire': {
      title: 'The Cultural Significance of Traditional Pakistani Attire',
      bannerImage: 'assets/banner/banner.png',
      content: [
        { type: 'heading', text: 'Introduction' },
        {
          type: 'paragraph',
          text: 'Traditional Pakistani attire, such as the shalwar kameez, holds profound cultural significance and offers numerous benefits beyond its aesthetic appeal.',
        },

        { type: 'heading', text: 'Cultural Identity and Pride' },
        {
          type: 'paragraph',
          text: 'Wearing traditional clothing fosters a sense of identity and pride. It allows individuals to connect with their heritage and showcases the rich tapestry of Pakistani culture. ',
          link: 'https://brainly.com/question/18244336',
        },

        { type: 'heading', text: 'Comfort and Practicality' },
        {
          type: 'paragraph',
          text: 'Designed to suit the South Asian climate, traditional attires like the shalwar kameez are both comfortable and practical. Fabrics such as Cotton Karandi are breathable and moisture-absorbent, making them ideal for warm weather.',
          link: 'https://thedesignerrack.co.uk/benefits-of-wearing-cotton-karandi-dresses/',
        },

        { type: 'heading', text: 'Versatility in Fashion' },
        {
          type: 'paragraph',
          text: 'The adaptability of traditional Pakistani clothing allows for both formal and casual wear. Whether attending a wedding or a casual gathering, the shalwar kameez can be styled appropriately, reflecting its versatility.',
        },

        { type: 'heading', text: 'Conclusion' },
        {
          type: 'paragraph',
          text: 'Embracing traditional Pakistani attire is not only a nod to cultural heritage but also a testament to its enduring practicality and style. In a world of fast-changing fashion trends, these garments offer timeless elegance and comfort.',
          link: 'https://youtu.be/jYeyI42VWfc',
        },
      ],
    },
    'evolution-of-mens-shalwar-kameez': {
      title: "The Evolution of Men's Shalwar Kameez: Trends to Watch in 2025",
      bannerImage: 'assets/banner/banner.png',
      content: [
        { type: 'heading', text: 'Introduction' },
        {
          type: 'paragraph',
          text: 'The shalwar kameez, a staple in South Asian attire, has undergone significant transformations over the years. In 2025, this traditional ensemble continues to evolve, blending classic elements with contemporary fashion trends.',
        },

        { type: 'heading', text: 'Fusion of Traditional and Western Styles' },
        {
          type: 'paragraph',
          text: 'One notable trend is the fusion of traditional shalwar kameez with Western fashion. Designers are incorporating Western cuts and styles, such as pairing the kameez with jeans or adding modern embellishments, creating a unique blend that appeals to the younger generation.',
          link: 'https://en.wikipedia.org/wiki/Indo-Western_clothing',
        },

        { type: 'heading', text: 'Innovative Designs and Patterns' },
        {
          type: 'paragraph',
          text: "The latest designs showcase a variety of styles, from minimalist patterns to intricate embroideries. Platforms like Pinterest feature extensive collections of men's shalwar kameez designs, highlighting the diversity and creativity in contemporary fashion.",
          link: 'https://www.pinterest.com/bilalrazaaslam1/mens-shalwar-kameez/',
        },

        { type: 'heading', text: 'Color Palette and Fabrics' },
        {
          type: 'paragraph',
          text: "In 2025, there's a noticeable shift towards earthy tones and muted colors, moving away from the conventional bright hues. Fabrics like Cotton Karandi are favored for their comfort and breathability, making them ideal for both casual and formal wear.",
        },

        { type: 'heading', text: 'Conclusion' },
        {
          type: 'paragraph',
          text: 'The shalwar kameez in 2025 exemplifies a harmonious blend of tradition and modernity. By embracing contemporary trends while honoring cultural roots, this attire remains a timeless choice for the modern man.',
        },
      ],
    },
    'styling-mens-shalwar-kameez-for-various-occasions': {
      title: "Styling Men's Shalwar Kameez for Various Occasions",
      bannerImage: 'assets/banner/banner.png',
      content: [
        { type: 'heading', text: 'Introduction' },
        {
          type: 'paragraph',
          text: "The versatility of the shalwar kameez makes it suitable for a wide range of occasions. Styling this traditional attire appropriately can enhance one's appearance, whether it's for a casual gathering or a formal event.",
        },

        { type: 'heading', text: 'Casual Wear' },
        {
          type: 'paragraph',
          text: 'For everyday wear, opt for a simple shalwar kameez in light fabrics like cotton. Neutral colors such as beige or light blue provide a relaxed look. Pairing the outfit with traditional sandals completes the casual ensemble.',
        },

        { type: 'heading', text: 'Formal Events' },
        {
          type: 'paragraph',
          text: 'Attending a formal event calls for a more refined shalwar kameez. Dark colors like navy or charcoal, coupled with high-quality fabrics, exude sophistication. Adding a waistcoat can elevate the look, making it suitable for weddings or corporate functions.',
        },

        { type: 'heading', text: 'Festive Occasions' },
        {
          type: 'paragraph',
          text: 'During festive seasons, vibrant colors and intricate embroideries are popular choices. Embellished collars and cuffs add a festive touch, reflecting the celebratory spirit. Accessorizing with a matching shawl can further enhance the traditional appeal.',
        },

        { type: 'heading', text: 'Seasonal Considerations' },
        {
          type: 'paragraph',
          text: 'Choosing the right fabric is crucial for comfort. In warmer months, lightweight materials like lawn or cotton are advisable, while heavier fabrics like wool are suitable for cooler climates.',
        },

        { type: 'heading', text: 'Conclusion' },
        {
          type: 'paragraph',
          text: "The shalwar kameez's adaptability allows it to be styled for various occasions. By selecting appropriate fabrics, colors, and accessories, one can effortlessly achieve a look that is both comfortable and stylish.",
        },
      ],
    },
    'art-of-accessorizing-mens-shalwar-kameez': {
      title:
        "The Art of Accessorizing Men's Shalwar Kameez: Elevate Your Traditional Attire",
      bannerImage: 'assets/banner/banner.png',
      content: [
        { type: 'heading', text: 'Introduction' },
        {
          type: 'paragraph',
          text: 'The shalwar kameez is a timeless ensemble that embodies the rich cultural heritage of South Asia. While the outfit itself is inherently elegant, thoughtful accessorizing can enhance its appeal, allowing for personal expression and contemporary flair.',
        },

        { type: 'heading', text: '1. Footwear: The Foundation of Style' },
        {
          type: 'paragraph',
          text: 'Choosing the right footwear is crucial in complementing your shalwar kameez:',
        },
        {
          type: 'list',
          items: [
            'Traditional Peshawari Chappals: Originating from Peshawar, these sandals are renowned for their durability and comfort. Their intricate design adds authenticity to your attire.',
            'Mojaris: These handcrafted leather shoes, often embellished with embroidery, offer a regal touch suitable for formal occasions.',
          ],
        },

        { type: 'heading', text: '2. Headwear: A Nod to Tradition' },
        {
          type: 'paragraph',
          text: 'Incorporating traditional headwear can add depth to your ensemble:',
        },
        {
          type: 'list',
          items: [
            'Turban (Pagri): Wearing a turban not only signifies cultural pride but also adds a distinguished look, especially during weddings and festivals.',
            'Sindhi Topi: This circular cap, adorned with intricate embroidery and mirror work, is a staple in Sindhi attire and can infuse a unique cultural element into your outfit.',
          ],
        },

        { type: 'heading', text: '3. Outerwear: Layering with Elegance' },
        {
          type: 'paragraph',
          text: 'Adding layers can enhance both style and functionality:',
        },
        {
          type: 'list',
          items: [
            'Waistcoat (Sadri): A well-fitted waistcoat can transform a simple shalwar kameez into a sophisticated ensemble, perfect for formal gatherings.',
            'Shawl: Draping a shawl over your shoulders not only provides warmth but also adds a touch of elegance. Opt for shawls with subtle embroidery or patterns to complement your attire.',
          ],
        },

        { type: 'heading', text: '4. Jewelry: Subtle Statements' },
        {
          type: 'paragraph',
          text: "While men's jewelry should be understated, certain pieces can enhance your look:",
        },
        {
          type: 'list',
          items: [
            'Cufflinks: Elegant cufflinks can add a modern twist to traditional attire, especially when wearing a kameez with French cuffs',
            'Wristwatch: A classic wristwatch serves as both a functional accessory and a style statement, reflecting personal taste.',
          ],
        },

        { type: 'heading', text: 'Conclusion' },
        {
          type: 'paragraph',
          text: 'Accessorizing the shalwar kameez allows for personalization and the infusion of contemporary elements into traditional attire. By thoughtfully selecting accessories, you can elevate your ensemble, making it suitable for various occasions while honoring cultural heritage.',
        },
      ],
    },
    'influence-of-regional-styles': {
      title: "The Influence of Regional Styles on Men's Shalwar Kameez Designs",
      bannerImage: 'assets/banner/banner.png',
      content: [
        { type: 'heading', text: 'Introduction' },
        {
          type: 'paragraph',
          text: 'The shalwar kameez, a quintessential South Asian attire, exhibits a rich tapestry of regional variations. Each style reflects the unique cultural, historical, and climatic influences of its origin, offering a diverse range of designs for the modern wearer.',
        },

        {
          type: 'heading',
          text: '1. Punjabi Shalwar Kameez: Vibrancy and Comfort',
        },
        {
          type: 'paragraph',
          text: 'Originating from the Punjab region, this style is characterized by its vibrant colors and comfortable fit. The kameez is typically straight-cut with side slits, paired with a loose-fitting salwar that tapers at the ankles. The ensemble often features intricate embroidery, reflecting the lively culture of Punjab.',
          link: 'https://en.wikipedia.org/wiki/Shalwar_kameez',
        },

        {
          type: 'heading',
          text: '2. Balochi Shalwar Kameez: Embroidered Grandeur',
        },
        {
          type: 'paragraph',
          text: 'Hailing from Balochistan, the Balochi shalwar kameez is renowned for its elaborate embroidery and distinctive cuts. The kameez is usually long and loose, adorned with detailed needlework that showcases traditional motifs. The salwar is wide and baggy, providing comfort in the arid climate of the region.',
          link: 'https://en.wikipedia.org/wiki/Shalwar_kameez',
        },

        {
          type: 'heading',
          text: '3. Sindhi Shalwar Kameez: Mirror Work and Ajrak Prints',
        },
        {
          type: 'paragraph',
          text: 'The Sindhi version stands out with its use of mirror work and traditional Ajrak prints. The kameez often features intricate embroidery with small mirrors, creating a shimmering effect. Paired with a salwar or suthan, this style reflects the rich cultural heritage of Sindh.',
          link: 'https://en.wikipedia.org/wiki/Shalwar_kameez',
        },

        {
          type: 'heading',
          text: '4. Pashtun Shalwar Kameez: Simplicity and Functionality',
        },
        {
          type: 'paragraph',
          text: 'In the Khyber Pakhtunkhwa region, the Pashtun shalwar kameez is favored for its simplicity and practicality. The kameez is typically plain with minimal embellishments, and the salwar is loose-fitting, allowing ease of movement. This understated style aligns with the modest cultural norms of the Pashtun community.',
          link: 'https://en.wikipedia.org/wiki/Shalwar_kameez',
        },
        { type: 'heading', text: 'Conclusion' },
        {
          type: 'paragraph',
          text: 'The regional variations of the shalwar kameez offer a rich array of styles, each telling a unique story of cultural identity and tradition. Embracing these diverse designs allows individuals to express their heritage and personal style, ensuring the timeless relevance of this traditional attire.',
        },
      ],
    },
  };

  blog: Blog | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug && this.blogs[slug]) {
      this.blog = this.blogs[slug];
    }
  }
}
