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
];

export const categories = ["All", "Crews", "Pants", "Jackets"];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
