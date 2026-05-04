import { Heart, ShoppingBag, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useSearchParams } from "react-router-dom";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const setSelectedCategory = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:9200/api/products");
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-secondary/40">
        <Loader2 className="h-10 w-10 animate-spin text-gold mb-4" />
        <p className="text-muted-foreground animate-pulse uppercase tracking-widest text-xs">Loading Collection...</p>
      </div>
    );
  }

  return (
    <section id="shop" className="py-24 lg:py-32 bg-secondary/40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">
              Featured Edit
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05] text-balance max-w-2xl">
              The pieces everyone's <em className="font-script font-normal text-gold">obsessing</em> over
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "T-Shirts", "Hoodies", "Track Pants", "Shorts"].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedCategory(f)}
                className={`px-5 py-2 text-xs uppercase tracking-wider font-medium border transition-all ${
                  selectedCategory === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent border-border text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-16">
          {filteredProducts.map((p) => (
            <article key={p._id} className="group">
              <div className="relative overflow-hidden bg-background mb-4 aspect-[4/5]">
                <Link to={`/product/${p._id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    width={800}
                    height={1024}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </Link>
                {p.tag && (
                  <span className="absolute top-3 left-3 lg:top-4 lg:left-4 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
                    {p.tag}
                  </span>
                )}
                <button
                  aria-label="Wishlist"
                  className="absolute top-3 right-3 lg:top-4 lg:right-4 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-gold hover:text-gold-foreground transition-colors"
                >
                  <Heart className="h-4 w-4" />
                </button>

                {/* Hover actions */}
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" className="flex-1 btn-shine" asChild>
                      <Link to={`/product/${p._id}`}>
                        <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                        Details
                      </Link>
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-background/95 hover:bg-gold hover:text-gold-foreground" aria-label="Quick view" asChild>
                      <Link to={`/product/${p._id}`}>
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.category}
                </p>
                <Link to={`/product/${p._id}`}>
                  <h3 className="font-display text-lg lg:text-xl font-semibold text-primary leading-tight hover:text-gold transition-colors">
                    {p.name}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-foreground">₹{p.price}</span>
                  {p.was && (
                    <span className="text-sm text-muted-foreground line-through">₹{p.was}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
