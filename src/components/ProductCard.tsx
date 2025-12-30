import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString("en-IN")}`;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && product.images[1] ? "opacity-0" : "opacity-100"
          }`}
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Size Pills - Show on hover */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {product.sizes.map((size) => (
            <span
              key={size}
              className="px-2 py-1 text-[10px] tracking-wider bg-background/90 backdrop-blur-sm"
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm tracking-wide group-hover:text-muted-foreground transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
