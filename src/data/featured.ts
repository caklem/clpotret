export type FeaturedCategory = 'Graduation' | 'Portrait' | 'Outdoor' | 'Couple' | 'Family' | 'Event' | 'Hunting';

export interface FeaturedItem {
  slug: string;
  title: string;
  category: FeaturedCategory;
  location: string;
  image: string;
  ratio: 'portrait' | 'landscape' | 'square';
  objectPosition?: string;
}

// ============================================
// FOTO FEATURED WORK (Homepage)
// ============================================
// Ganti URL foto di bawah ini dengan foto kamu sendiri.
// Format: '/IMG/nama-file.jpg' untuk foto lokal, atau URL external.
// ============================================

const images = [
  '/IMG/featured/_DSC0070.jpg',
  '/IMG/featured/_DSC0084.jpg',
  '/IMG/featured/Dosen1.JPG',
  '/IMG/featured/Dosen2.JPG',
];

export const featured: FeaturedItem[] = [
  {
    slug: 'hunting-bunga-matahari',
    title: 'Golden Hour in Sunflower Field',
    category: 'Hunting',
    location: 'Ladang Bunga Matahari, Batu',
    image: images[0],
    ratio: 'portrait',
  },
  {
    slug: 'portrait-bunga-matahari',
    title: 'Sunshine & Sunflowers',
    category: 'Portrait',
    location: 'Ladang Bunga Matahari, Batu',
    image: images[1],
    ratio: 'portrait',
  },
  {
    slug: 'dosen-polinema-1',
    title: 'Formal Portrait',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: images[2],
    ratio: 'portrait',
    objectPosition: 'center 20%',
  },
  {
    slug: 'dosen-polinema-2',
    title: 'Corporate Headshot',
    category: 'Portrait',
    location: 'Politeknik Negeri Malang',
    image: images[3],
    ratio: 'portrait',
    objectPosition: 'center 20%',
  },
];
