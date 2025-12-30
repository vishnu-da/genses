export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Salient Crew Neck",
    price: 1399,
    category: "Crews",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Premium mercerised cotton crew neck with a refined fit. Features ribbed collar and cuffs for lasting shape retention. Crafted from 100% organic cotton for exceptional softness and breathability.",
  },
  {
    id: "2",
    name: "Essential Crew Tee",
    price: 1199,
    category: "Crews",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "A wardrobe essential crafted from heavyweight cotton. Relaxed fit with dropped shoulders for contemporary styling. Pre-washed for immediate comfort.",
  },
  {
    id: "3",
    name: "Midnight Oversized Tee",
    price: 1499,
    category: "Crews",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "Bold oversized silhouette in rich midnight black. Made from premium pima cotton with a subtle texture. Perfect for layering or standalone statement looks.",
  },
  {
    id: "4",
    name: "Tailored Chino Pants",
    price: 2499,
    category: "Pants",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    description: "Impeccably tailored chinos with a modern slim fit. Crafted from stretch cotton twill for all-day comfort. Features a clean front with hidden button closure.",
  },
  {
    id: "5",
    name: "Relaxed Linen Trousers",
    price: 2899,
    category: "Pants",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Breathable linen trousers with a relaxed, flowing silhouette. Ideal for warm weather styling. Features an elastic waistband with drawstring for adjustable comfort.",
  },
  {
    id: "6",
    name: "Structured Wool Blazer",
    price: 5999,
    category: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "A refined wool-blend blazer with impeccable tailoring. Single-breasted design with notch lapels. Fully lined interior with internal pockets.",
  },
  {
    id: "7",
    name: "Minimal Bomber Jacket",
    price: 4499,
    category: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Contemporary bomber with clean lines and minimal hardware. Crafted from water-resistant nylon with ribbed cuffs and hem. Lightweight yet warm quilted lining.",
  },
  {
    id: "8",
    name: "Classic Denim Jacket",
    price: 3999,
    category: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Timeless denim jacket in a classic medium wash. Features traditional button closure with chest pockets. Slightly cropped cut for modern proportions.",
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
