import { Link } from "react-router-dom";
import { ShoppingBag, User, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-1.5 group">
            <span className={`font-display font-black text-2xl lg:text-3xl tracking-tight transition-colors duration-500 ${
              scrolled ? "text-primary" : "text-white"
            }`}>
              AS
            </span>
            <span className="font-script text-2xl lg:text-3xl text-gold leading-none translate-y-1">
              Fashion
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.href}
                className={`link-underline text-sm font-medium tracking-wide uppercase transition-colors duration-500 ${
                  scrolled ? "text-foreground/80" : "text-white/90"
                } hover:text-gold`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className={`hidden md:inline-flex transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="icon" className={`transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`} aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className={`relative transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`} aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border/50"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
