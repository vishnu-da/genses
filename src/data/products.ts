export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  gender: 'Men' | 'Women' | 'Unisex';
  image: string;
  sizes: string[];
  fabricComposition: string;
  fabricCharacter: string;
  styleArchetype: string;
  dimensions: {
    chest: number;
    length: number;
  };
  description: string;
}

export const products: Product[] = [
  {
    id: 'CREW-001-NVY',
    name: 'Salient Crew Neck',
    price: 1399,
    category: 'Crews',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fabricComposition: '100% Cotton',
    fabricCharacter: 'Medium Drape',
    styleArchetype: 'Regular Fit',
    dimensions: { chest: 42, length: 28 },
    description: 'Premium mercerised cotton crew neck with a refined fit. Features ribbed collar and cuffs for lasting shape retention. Crafted from 100% organic cotton for exceptional softness and breathability.',
  },
  {
    id: 'CREW-002-WHT',
    name: 'Essential Crew Tee',
    price: 1199,
    category: 'Crews',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    fabricComposition: '100% Organic Cotton',
    fabricCharacter: 'High Drape',
    styleArchetype: 'Relaxed Fit',
    dimensions: { chest: 44, length: 29 },
    description: 'A wardrobe essential crafted from heavyweight cotton. Relaxed fit with dropped shoulders for contemporary styling. Pre-washed for immediate comfort.',
  },
  {
    id: 'CREW-003-BLK',
    name: 'Midnight Oversized Tee',
    price: 1499,
    category: 'Crews',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    fabricComposition: 'Pima Cotton',
    fabricCharacter: 'Medium Drape',
    styleArchetype: 'Oversized',
    dimensions: { chest: 48, length: 30 },
    description: 'Bold oversized silhouette in rich midnight black. Made from premium pima cotton with a subtle texture. Perfect for layering or standalone statement looks.',
  },
  {
    id: 'CREW-004-GRY',
    name: 'Cloud Crew Neck',
    price: 1299,
    category: 'Crews',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabricComposition: 'Cotton-Modal Blend',
    fabricCharacter: 'High Drape',
    styleArchetype: 'Slim Fit',
    dimensions: { chest: 38, length: 25 },
    description: 'Ultra-soft crew neck with a gentle hand feel. The cotton-modal blend offers exceptional breathability and natural stretch for all-day comfort.',
  },
  {
    id: 'PANT-001-KHK',
    name: 'Tailored Chino Pants',
    price: 2499,
    category: 'Pants',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    sizes: ['28', '30', '32', '34', '36'],
    fabricComposition: 'Cotton Twill with 2% Elastane',
    fabricCharacter: 'Stiff',
    styleArchetype: 'Slim Fit',
    dimensions: { chest: 0, length: 32 },
    description: 'Impeccably tailored chinos with a modern slim fit. Crafted from stretch cotton twill for all-day comfort. Features a clean front with hidden button closure.',
  },
  {
    id: 'PANT-002-NAT',
    name: 'Relaxed Linen Trousers',
    price: 2899,
    category: 'Pants',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    fabricComposition: '100% Linen',
    fabricCharacter: 'High Drape',
    styleArchetype: 'Relaxed Fit',
    dimensions: { chest: 0, length: 30 },
    description: 'Breathable linen trousers with a relaxed, flowing silhouette. Ideal for warm weather styling. Features an elastic waistband with drawstring for adjustable comfort.',
  },
  {
    id: 'JACK-001-BLK',
    name: 'Structured Wool Blazer',
    price: 5999,
    category: 'Jackets',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    fabricComposition: 'Wool-Polyester Blend',
    fabricCharacter: 'Stiff',
    styleArchetype: 'Regular Fit',
    dimensions: { chest: 44, length: 30 },
    description: 'A refined wool-blend blazer with impeccable tailoring. Single-breasted design with notch lapels. Fully lined interior with internal pockets.',
  },
  {
    id: 'JACK-002-OLV',
    name: 'Minimal Bomber Jacket',
    price: 4499,
    category: 'Jackets',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabricComposition: '100% Nylon',
    fabricCharacter: 'Medium Drape',
    styleArchetype: 'Boxy',
    dimensions: { chest: 46, length: 26 },
    description: 'Contemporary bomber with clean lines and minimal hardware. Crafted from water-resistant nylon with ribbed cuffs and hem. Lightweight yet warm quilted lining.',
  },
  {
    id: 'JACK-003-BLU',
    name: 'Classic Denim Jacket',
    price: 3999,
    category: 'Jackets',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    fabricComposition: '100% Cotton Denim',
    fabricCharacter: 'Stiff',
    styleArchetype: 'Regular Fit',
    dimensions: { chest: 44, length: 25 },
    description: 'Timeless denim jacket in a classic medium wash. Features traditional button closure with chest pockets. Slightly cropped cut for modern proportions.',
  },
  {
    id: 'CREW-005-CRM',
    name: 'Waffle Knit Henley',
    price: 1699,
    category: 'Crews',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabricComposition: 'Cotton Waffle Knit',
    fabricCharacter: 'Elastic',
    styleArchetype: 'Regular Fit',
    dimensions: { chest: 42, length: 28 },
    description: 'Textured waffle knit henley with a timeless appeal. Features a three-button placket and ribbed cuffs. The thermal weave provides warmth without bulk.',
  },
];

export const categories = ["All", "Crews", "Pants", "Jackets"];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
