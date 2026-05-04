import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Arjun Mehta",
    role: "Reseller · Mumbai",
    text: "Quality is on par with premium brands at a fraction of the price. My customers can't tell the difference — and they keep coming back for more.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Customer · Bangalore",
    text: "The fabric feels incredible and the fit is so flattering. AS Fashion is now my go-to for everyday essentials. Three orders in and zero complaints.",
    rating: 5,
  },
  {
    name: "Rahul Krishnan",
    role: "Boutique Owner · Chennai",
    text: "Working with the AS Fashion team has been seamless. Fast turnarounds, great margins, and a product line that genuinely sells itself in my store.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-secondary/40 relative overflow-hidden">
      <Quote className="absolute -top-8 -left-8 h-72 w-72 text-primary/[0.04] rotate-180" />
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">
            Testimonials
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05] text-balance">
            Trusted by thousands <em className="font-script font-normal text-gold">across India</em>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[280px] lg:min-h-[240px]">
            {REVIEWS.map((r, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 ${
                  idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl text-primary leading-snug mb-8 text-balance italic font-medium">
                    "{r.text}"
                  </p>
                  <div className="space-y-1">
                    <p className="font-semibold text-primary tracking-wide">{r.name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Review ${idx + 1}`}
                className={`h-[2px] transition-all duration-500 ${
                  idx === i ? "w-12 bg-gold" : "w-6 bg-primary/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
