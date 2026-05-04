import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { Categories } from "@/components/site/Categories";
import { MessageCircle } from "lucide-react";

const WA = "https://wa.me/919626833050?text=Hi%20I%20want%20to%20know%20about%20wholesale%20and%20reseller%20for%20AS%20Fashion";

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <FeaturedProducts />
        <Categories />
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-gold text-gold-foreground shadow-gold flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
      </a>
    </div>
  );
};

export default Shop;
