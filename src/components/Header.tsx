import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { categories } from "@/data/products";

interface HeaderProps {
  onCategoryChange?: (category: string) => void;
  activeCategory?: string;
  showFilters?: boolean;
}

export function Header({ onCategoryChange, activeCategory = "All", showFilters = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Main Header */}
      <div className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          {/* Left - Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                Shop
              </Link>
              <Link to="/" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-heading text-2xl font-bold tracking-[0.2em]">GENSES</h1>
          </Link>

          {/* Right - Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary transition-colors" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-secondary transition-colors hidden sm:block" aria-label="Account">
              <User size={20} />
            </button>
            <button className="p-2 hover:bg-secondary transition-colors relative" aria-label="Cart">
              <ShoppingBag size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="border-b border-border">
          <div className="container">
            <nav className="flex items-center gap-8 h-12 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange?.(category)}
                  className={`text-sm tracking-wide whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <nav className="container py-8 flex flex-col gap-6">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg tracking-wide"
            >
              Shop
            </Link>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg tracking-wide"
            >
              About
            </Link>
            <div className="border-t border-border pt-6 mt-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg tracking-wide flex items-center gap-3"
              >
                <User size={20} />
                Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
