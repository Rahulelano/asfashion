import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTshirts from "@/assets/hero-tshirts.jpg";
import heroTrack from "@/assets/hero-trackpants.jpg";
import heroHoodies from "@/assets/hero-hoodies.jpg";

const SLIDES = [
  {
    image: heroTshirts,
    eyebrow: "New Arrivals · SS26",
    title: "Upgrade Your Style",
    subtitle: "Premium Quality at Affordable Price",
    collection: "Men's T-Shirts Collection",
  },
  {
    image: heroTrack,
    eyebrow: "Streetwear Edit",
    title: "Streetwear Redefined",
    subtitle: "Track Pants engineered for everyday performance",
    collection: "Track Pants & Streetwear",
  },
  {
    image: heroHoodies,
    eyebrow: "Winter Capsule",
    title: "Comfort Meets Fashion",
    subtitle: "Crafted heavyweight hoodies for an elevated everyday",
    collection: "Hoodies & Winter Wear",
  },
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-primary">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={s.image}
              alt={s.collection}
              width={1920}
              height={1080}
              className={`h-full w-full object-cover ${i === index ? "animate-ken-burns" : ""}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 lg:px-8 flex items-center">
        <div key={index} className="max-w-2xl text-primary-foreground animate-slide-up">
          <p className="text-xs lg:text-sm uppercase tracking-[0.3em] text-gold mb-6 font-medium">
            {SLIDES[index].eyebrow}
          </p>
          <h1 className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 text-balance">
            {SLIDES[index].title}
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-lg font-light">
            {SLIDES[index].subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="gold" className="group" asChild>
              <Link to="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outlineLight" asChild>
              <Link to="/shop">
                Explore Collection
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 lg:bottom-12 right-4 lg:right-8 z-10 flex items-center gap-3">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="h-11 w-11 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2 px-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-[2px] transition-all duration-500 ${
                i === index ? "w-12 bg-gold" : "w-6 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="h-11 w-11 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 glass-dark border-t border-primary-foreground/10 py-3 overflow-hidden hidden md:block">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-primary-foreground/70 text-xs uppercase tracking-[0.3em]">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              <span>Free Shipping Above ₹999</span>
              <span className="text-gold">◆</span>
              <span>Wholesale Enquiries Welcome</span>
              <span className="text-gold">◆</span>
              <span>Premium Cotton Blend</span>
              <span className="text-gold">◆</span>
              <span>Made in Tirupur, India</span>
              <span className="text-gold">◆</span>
              <span>Easy 7-Day Returns</span>
              <span className="text-gold">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
