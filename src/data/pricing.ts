// ============================================
// DATA PRICING — CL Potret
// ============================================
// Update harga, benefit, dan add-on di bawah ini.
// Halaman pricing akan render berdasarkan data ini.
// ============================================

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  note?: string;
  tagline?: string;
  features: string[];
}

export interface AddOn {
  name: string;
  price: string;
}

// --------------------------------------------
// GRADUATION PHOTOGRAPHY
// --------------------------------------------

export const graduationPackages: PricingPackage[] = [
  {
    id: 'basic-graduation',
    name: 'Basic Graduation',
    price: 'Rp150.000',
    tagline: 'Simple moments, big memories',
    features: [
      '30 menit sesi foto',
      '1 wisudawan',
      '10 foto edit',
      'All file original',
      'Delivery via Google Drive',
    ],
  },
  {
    id: 'graduation-standard',
    name: 'Graduation Standard',
    price: 'Rp225.000',
    tagline: 'Together makes it special',
    features: [
      '60 menit sesi foto',
      '1 wisudawan + keluarga/pasangan',
      '20 foto edit',
      'All file original',
      'Delivery via Google Drive',
    ],
  },
  {
    id: 'graduation-bestie',
    name: 'Graduation Bestie',
    price: 'Rp300.000',
    tagline: 'Friends today, legends tomorrow',
    features: [
      '60–90 menit sesi foto',
      'Maksimal 2 wisudawan',
      '25 foto edit',
      'All file original',
      'Foto bersama keluarga/teman',
    ],
  },
];

export const graduationAddOns: AddOn[] = [
  { name: 'Extra 30 menit', price: '+Rp50.000' },
  { name: 'Extra wisudawan', price: '+Rp75.000/orang' },
  { name: 'Extra 10 foto edit', price: '+Rp50.000' },
  { name: 'Rush edit', price: '+Rp50.000' },
  { name: 'Transport luar Kota Malang', price: 'Menyesuaikan' },
];

// --------------------------------------------
// GENERAL PHOTOGRAPHY
// --------------------------------------------

export const generalPackages: PricingPackage[] = [
  {
    id: 'personal-hunting',
    name: 'Personal / Hunting',
    price: 'Rp150.000',
    tagline: 'Your story, your moment',
    features: [
      '60 menit sesi foto',
      '1 orang',
      '15 foto edit',
      'All file original',
      'Delivery via Google Drive',
    ],
  },
  {
    id: 'couple-bestie',
    name: 'Couple / Bestie',
    price: 'Rp200.000',
    tagline: 'Together looks better',
    features: [
      '60 menit sesi foto',
      'Maksimal 2 orang',
      '20 foto edit',
      'All file original',
      'Delivery via Google Drive',
    ],
  },
  {
    id: 'event-documentation',
    name: 'Event / Documentation',
    price: 'Mulai Rp250.000',
    tagline: 'Small events, big memories',
    features: [
      '2 jam dokumentasi',
      'All file original',
      '20 foto edit pilihan',
      'Cocok untuk acara kecil',
    ],
  },
  {
    id: 'travel-outdoor',
    name: 'Travel / Outdoor Session',
    price: 'Mulai Rp200.000',
    tagline: 'Explore more, capture further',
    features: [
      '60–90 menit sesi foto',
      '15–20 foto edit',
      'All file original',
      'Transport menyesuaikan lokasi',
    ],
  },
];

export const generalAddOns: AddOn[] = [
  { name: 'Extra 30 menit', price: '+Rp50.000' },
  { name: 'Extra 10 foto edit', price: '+Rp50.000' },
  { name: 'Rush edit', price: '+Rp50.000' },
  { name: 'Transport luar Kota Malang', price: 'Menyesuaikan' },
];
