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
    slug: 'portrait-polinema-angle',
    title: 'Academic Poise',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: '/IMG/portfolio/Dosen2(2).JPG',
    gallery: [
    ],
    ratio: 'portrait',
    description: 'Potret formal mahasiswa Polinema dalam balutan almamater, diambil dari sudut tiga perempat dengan pencahayaan hangat dan latar gelap.',
  },
  {
    slug: 'portrait-polinema-formal',
    title: 'Formal Confidence',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: '/IMG/portfolio/Dosen2.JPG',
    gallery: [
      '/IMG/graduation-hero.jpg',
      '/IMG/services/Wisuda1.jpg',
      '/IMG/featured/Dosen1.JPG',
    ],
    ratio: 'landscape',
    description: 'Potret formal mahasiswa Polinema menghadap kamera, menonjolkan kesan rapi dan percaya diri dengan latar hitam yang bersih.',
  },
  {
    slug: 'portrait-polinema-bagas',
    title: 'Professional Focus',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: '/IMG/portfolio/Bagas1.JPG',
    gallery: [
      '/IMG/featured/_DSC0084.jpg',
      '/IMG/featured/_DSC0070.jpg',
      '/IMG/featured/Dosen2.JPG',
    ],
    ratio: 'portrait',
    description: 'Potret profesional mahasiswa berkacamata dengan almamater Polinema, dibingkai simetris dalam pencahayaan studio yang hangat.',
  },
  {
    slug: 'portrait-polinema-three-quarter',
    title: 'A Composed Profile',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: '/IMG/portfolio/Bagas2.JPG',
    gallery: [
      '/IMG/services/Weeding.jpg',
      '/IMG/_DSC0089.jpg',
      '/IMG/featured/_DSC0070.jpg',
    ],
    ratio: 'landscape',
    description: 'Potret tiga perempat dalam almamater Polinema, menghadirkan karakter yang tenang melalui arah pandang dan cahaya lembut.',
  },
  {
    slug: 'portrait-polinema-grace',
    title: 'Grace in Frame',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: '/IMG/portfolio/Dosen3.jpg',
    gallery: [
      '/IMG/services/Family.jpg',
      '/IMG/services/Family2.jpg',
      '/IMG/about-sunflower.jpg',
    ],
    ratio: 'square',
    description: 'Potret formal berhijab dengan almamater Polinema, memadukan senyum natural, pose menyamping, dan pencahayaan yang lembut.',
  },
  {
    slug: 'portrait-polinema-confidence',
    title: 'Quiet Confidence',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: '/IMG/portfolio/Dosen3(3).JPG',
    gallery: [
      '/IMG/services/Event.jpeg',
      '/IMG/services/_DSC0171.jpg',
      '/IMG/featured/Dosen1.JPG',
    ],
    ratio: 'landscape',
    description: 'Potret formal berhijab yang menghadap kamera, menampilkan ekspresi ramah dan percaya diri dalam suasana studio yang bersih.',
  },
  {
    slug: 'outdoor-raya',
    title: 'Open Air',
    category: 'Outdoor',
    location: 'Batu',
    image: '/IMG/portfolio/_DSC0108.jpg',
    gallery: [
      '/IMG/about-sunflower.jpg',
      '/IMG/featured/_DSC0084.jpg',
      '/IMG/graduation-hero.jpg',
    ],
    ratio: 'portrait',
    description: 'Potret outdoor di depan cermin pada kebun bunga matahari, memadukan refleksi, langit biru, dan warna pastel yang cerah.',
  },
  {
    slug: 'sunflower-field-portrait',
    title: 'Among the Sunflowers',
    category: 'Outdoor',
    location: 'Kebun Bunga Matahari, Batu',
    image: '/IMG/portfolio/_DSC0064.jpg',
    gallery: [
      '/IMG/featured/Dosen1.JPG',
      '/IMG/services/Dosen3.jpg',
      '/IMG/featured/Dosen2.JPG',
    ],
    ratio: 'portrait',
    description: 'Potret ceria di antara bunga matahari yang sedang mekar, dengan cahaya siang dan palet busana pastel yang lembut.',
  },
  {
    slug: 'sunlit-bloom',
    title: 'Sunlit Bloom',
    category: 'Outdoor',
    location: 'Kebun Bunga Matahari, Batu',
    image: '/IMG/portfolio/_DSC0207.jpg',
    gallery: [
      '/IMG/featured/Dosen1.JPG',
      '/IMG/services/Dosen3.jpg',
      '/IMG/featured/Dosen2.JPG',
    ],
    ratio: 'portrait',
    description: 'Close-up bernuansa cerah di kebun bunga matahari, dibingkai kelopak kuning dengan aksesori topi yang playful.',
  },
  {
    slug: 'summer-among-sunflowers',
    title: 'Summer Among Sunflowers',
    category: 'Outdoor',
    location: 'Kebun Bunga Matahari, Batu',
    image: '/IMG/portfolio/_DSC0022.jpg',
    gallery: [
      '/IMG/featured/Dosen1.JPG',
      '/IMG/services/Dosen3.jpg',
      '/IMG/featured/Dosen2.JPG',
    ],
    ratio: 'portrait',
    description: 'Potret horizontal dengan pose santai di bawah bunga matahari, menghadirkan suasana musim panas yang hangat dan penuh warna.',
  },

];

export const categories: Array<'All' | Category> = ['All', 'Graduation', 'Portrait', 'Outdoor', 'Couple', 'Family', 'Event'];
