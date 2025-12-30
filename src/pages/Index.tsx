import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/data/products";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const products = getProductsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
        showFilters={true}
      />

      <main className="container py-8 lg:py-12">
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4">GENSES</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium essentials crafted with intention. Designed for the modern wardrobe.
              </p>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 tracking-wide">HELP</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 tracking-wide">FOLLOW</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 GENSES. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
