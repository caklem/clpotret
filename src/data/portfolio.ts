export type Category = 'Graduation' | 'Portrait' | 'Outdoor' | 'Couple' | 'Family' | 'Event';

export interface PortfolioItem {
  slug: string;
  title: string;
  category: Category;
  location: string;
  image: string;
  gallery: string[];
  ratio: 'portrait' | 'landscape' | 'square';
  description: string;
  objectPosition?: string;
}

// ============================================
// FOTO PORTFOLIO
// ============================================
// Ganti URL foto di bawah ini dengan foto kamu sendiri.
// Format: '/IMG/portfolio/nama-file.jpg' untuk foto lokal.
//
// Struktur folder yang disarankan:
//   public/IMG/portfolio/
//     ├── graduation-1.jpg
//     ├── graduation-2.jpg
//     ├── portrait-1.jpg
//     └── dst.
//
// Setiap item punya:
//   - image: foto cover/thumbnail (1 foto)
//   - gallery: array 3 foto untuk halaman detail
// ============================================

export const portfolio: PortfolioItem[] = [
  {
    slug: 'graduation-polinema',
    title: 'A Quiet Milestone',
    category: 'Graduation',
    location: 'Polinema, Malang',
    image: '/IMG/portfolio/graduation-polinema-1.jpg',
    gallery: [
      '/IMG/portfolio/graduation-polinema-1.jpg',
      '/IMG/portfolio/graduation-polinema-2.jpg',
      '/IMG/portfolio/graduation-polinema-3.jpg',
    ],
    ratio: 'portrait',
    description: 'Sesi wisuda yang tenang dan personal, menangkap rasa lega di akhir sebuah perjalanan.',
  },
  {
    slug: 'graduation-ub',
    title: 'After the Ceremony',
    category: 'Graduation',
    location: 'Universitas Brawijaya',
    image: '/IMG/portfolio/graduation-ub-1.jpg',
    gallery: [
      '/IMG/portfolio/graduation-ub-1.jpg',
      '/IMG/portfolio/graduation-ub-2.jpg',
      '/IMG/portfolio/graduation-ub-3.jpg',
    ],
    ratio: 'landscape',
    description: 'Potret kelulusan dengan cahaya sore dan gestur yang apa adanya.',
  },
  {
    slug: 'portrait-arda',
    title: 'Arda in Afternoon',
    category: 'Portrait',
    location: 'Malang',
    image: '/IMG/portfolio/portrait-arda-1.jpg',
    gallery: [
      '/IMG/portfolio/portrait-arda-1.jpg',
      '/IMG/portfolio/portrait-arda-2.jpg',
      '/IMG/portfolio/portrait-arda-3.jpg',
    ],
    ratio: 'portrait',
    description: 'Portrait editorial sederhana dengan karakter personal yang kuat.',
  },
  {
    slug: 'couple-senja',
    title: 'Senja, Together',
    category: 'Couple',
    location: 'Batu',
    image: '/IMG/portfolio/couple-senja-1.jpg',
    gallery: [
      '/IMG/portfolio/couple-senja-1.jpg',
      '/IMG/portfolio/couple-senja-2.jpg',
      '/IMG/portfolio/couple-senja-3.jpg',
    ],
    ratio: 'landscape',
    description: 'Cerita dua orang dalam warna senja yang hangat dan natural.',
  },
  {
    slug: 'family-home',
    title: 'Feels Like Home',
    category: 'Family',
    location: 'Malang',
    image: '/IMG/portfolio/family-home-1.jpg',
    gallery: [
      '/IMG/portfolio/family-home-1.jpg',
      '/IMG/portfolio/family-home-2.jpg',
      '/IMG/portfolio/family-home-3.jpg',
    ],
    ratio: 'square',
    description: 'Kebersamaan keluarga, tanpa pose yang terasa dipaksakan.',
  },
  {
    slug: 'event-folk',
    title: 'A Night to Remember',
    category: 'Event',
    location: 'Malang',
    image: '/IMG/portfolio/event-folk-1.jpg',
    gallery: [
      '/IMG/portfolio/event-folk-1.jpg',
      '/IMG/portfolio/event-folk-2.jpg',
      '/IMG/portfolio/event-folk-3.jpg',
    ],
    ratio: 'landscape',
    description: 'Dokumentasi suasana, detail, dan energi sebuah perayaan.',
  },
  {
    slug: 'outdoor-raya',
    title: 'Open Air',
    category: 'Outdoor',
    location: 'Batu',
    image: '/IMG/portfolio/outdoor-raya-1.jpg',
    gallery: [
      '/IMG/portfolio/outdoor-raya-1.jpg',
      '/IMG/portfolio/outdoor-raya-2.jpg',
      '/IMG/portfolio/outdoor-raya-3.jpg',
    ],
    ratio: 'portrait',
    description: 'Hunting foto santai yang menyatu dengan ruang dan cahaya alami.',
  },
  {
    slug: 'portrait-mono',
    title: 'In Between',
    category: 'Portrait',
    location: 'Studio Malang',
    image: '/IMG/portfolio/portrait-mono-1.jpg',
    gallery: [
      '/IMG/portfolio/portrait-mono-1.jpg',
      '/IMG/portfolio/portrait-mono-2.jpg',
      '/IMG/portfolio/portrait-mono-3.jpg',
    ],
    ratio: 'portrait',
    description: 'Studi karakter minimal yang intim dan penuh tekstur.',
  },
];

export const categories: Array<'All' | Category> = ['All', 'Graduation', 'Portrait', 'Outdoor', 'Couple', 'Family', 'Event'];
