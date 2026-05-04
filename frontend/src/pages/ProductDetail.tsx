import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, Heart, ChevronRight, Star, Truck, ShieldCheck, RefreshCcw, Loader2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";

const WA = "https://wa.me/919626833050?text=";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:9200/api/products`);
        const data = await res.json();
        const found = data.find((p: any) => p._id === id);
        if (found) {
          setProduct(found);
          setActiveImage(found.image);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-gold" /></div>;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-gold hover:underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    // We need to adapt the product object to what CartContext expects if necessary
    addToCart({ ...product, id: product._id }, selectedSize);
    toast.success(`${product.name} added to cart!`);
  };

  const whatsappLink = `${WA}${encodeURIComponent(`Hi, I'm interested in the ${product.name} (Size: ${selectedSize || 'Not specified'}). Can you provide more details?`)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[4/5] bg-secondary overflow-hidden rounded-sm">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible">
                {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square w-20 h-20 md:w-full md:h-auto rounded-sm overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3 font-medium">
                  {product.category}
                </p>
                <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground font-sans">(4.8 / 5.0)</span>
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest border-l border-border pl-4">
                    84 Reviews
                  </span>
                </div>

                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                  {product.was && (
                    <span className="text-xl text-muted-foreground line-through">₹{product.was}</span>
                  )}
                  {product.was && (
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      {Math.round(((product.was - product.price) / product.was) * 100)}% OFF
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wider">Select Size</span>
                  <button className="text-xs text-gold underline font-medium">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-16 border flex items-center justify-center text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4">
                <Button 
                  size="xl" 
                  className="w-full bg-primary text-primary-foreground font-bold text-lg h-16 rounded-sm btn-shine"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button size="lg" variant="outline" className="h-14 rounded-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 group">
                    <Heart className="mr-2 h-5 w-5 group-hover:fill-current" />
                    Wishlist
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="h-14 rounded-sm bg-green-50 text-green-700 hover:bg-green-100 border-green-100">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Inquiry
                    </a>
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div className="text-center space-y-2">
                  <Truck className="h-6 w-6 mx-auto text-gold" />
                  <p className="text-[10px] uppercase tracking-wider font-bold">Fast Delivery</p>
                </div>
                <div className="text-center space-y-2">
                  <RefreshCcw className="h-6 w-6 mx-auto text-gold" />
                  <p className="text-[10px] uppercase tracking-wider font-bold">7-Day Returns</p>
                </div>
                <div className="text-center space-y-2">
                  <ShieldCheck className="h-6 w-6 mx-auto text-gold" />
                  <p className="text-[10px] uppercase tracking-wider font-bold">Secure Pay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
