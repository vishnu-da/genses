import varsityImg from "@/assets/products/varsity.png";
import blackTshirtImg from "@/assets/products/black-tshirt.png";
import poloImg from "@/assets/products/polo.png";
import jeansImg from "@/assets/products/jeans.png";
import shirtImg from "@/assets/products/shirt.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 'OVO-STAN-VRS-2025-001',
    name: 'Stanford Varsity Jacket',
    price: 12999,
    category: 'Jackets',
    image: varsityImg,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'KITH-LAX-PKT-2025-002',
    name: 'Essential Pocket Tee',
    price: 2499,
    category: 'Crews',
    image: blackTshirtImg,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'KNIT-POLO-JNY-2025-003',
    name: 'Knit Polo Sweater',
    price: 3499,
    category: 'Crews',
    image: poloImg,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'W-LEG-DENIM-2025-004',
    name: 'Wide Leg Denim',
    price: 4999,
    category: 'Pants',
    image: jeansImg,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'BTN-DWN-BRW-2025-005',
    name: 'Button Down Oxford Shirt',
    price: 2999,
    category: 'Crews',
    image: shirtImg,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  // Dummy products to fill catalog
  {
    id: 'DUMMY-CREW-001',
    name: 'Classic Crew Tee',
    price: 1999,
    category: 'Crews',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'DUMMY-CREW-002',
    name: 'Premium Cotton Tee',
    price: 2299,
    category: 'Crews',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'DUMMY-JACKET-001',
    name: 'Denim Trucker Jacket',
    price: 8999,
    category: 'Jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'DUMMY-PANTS-001',
    name: 'Slim Fit Chinos',
    price: 3999,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'DUMMY-CREW-003',
    name: 'Striped Henley',
    price: 2799,
    category: 'Crews',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'DUMMY-JACKET-002',
    name: 'Bomber Jacket',
    price: 9999,
    category: 'Jackets',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'DUMMY-PANTS-002',
    name: 'Cargo Pants',
    price: 4499,
    category: 'Pants',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=400&h=500&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
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
