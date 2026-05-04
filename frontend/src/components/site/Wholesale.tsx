import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Package, TrendingUp, Users } from "lucide-react";
import heroTrack from "@/assets/hero-trackpants.jpg";

const WA = "https://wa.me/918754388950?text=Hi%20I%20want%20to%20know%20about%20wholesale%20and%20reseller%20for%20AS%20Fashion";

const STATS = [
  { icon: Package, label: "Min Order", value: "50+ pcs" },
  { icon: TrendingUp, label: "Margin", value: "Up to 40%" },
  { icon: Users, label: "Resellers", value: "500+" },
];

export const Wholesale = () => {
  return (
    <section id="wholesale" className="relative py-24 lg:py-36 bg-gradient-dark text-primary-foreground overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img src={heroTrack} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />

      {/* Decorative gold accents */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-medium">
              Wholesale · Reseller · B2B
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 text-balance">
              Start Your Fashion <br />
              Business <em className="font-script font-normal text-gold">With Us</em>
            </h2>
            <p className="text-lg text-primary-foreground/75 mb-10 max-w-lg leading-relaxed">
              We offer wholesale and reseller opportunities with the best margins in the industry. Direct from our Tirupur production hub — no middlemen, premium quality, on-time delivery.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button asChild size="lg" variant="gold" className="group">
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact on WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outlineLight">
                Download Catalogue
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-8 border-t border-primary-foreground/15">
              {STATS.map((s) => (
                <div key={s.label}>
                  <s.icon className="h-5 w-5 text-gold mb-3" />
                  <p className="font-display font-bold text-2xl lg:text-3xl mb-1">{s.value}</p>
                  <p className="text-xs uppercase tracking-wider text-primary-foreground/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gold/30 blur-2xl rounded-3xl" />
            <div className="relative glass-dark border border-primary-foreground/15 p-8 lg:p-10 rounded-sm shadow-elegant">
              <div className="space-y-6">
                {[
                  { num: "01", title: "Bulk Pricing", text: "Tiered discounts that scale with order size — designed for resellers." },
                  { num: "02", title: "Custom Branding", text: "Private label, custom tags and packaging available on request." },
                  { num: "03", title: "Pan-India Delivery", text: "Direct dispatch from Tirupur within 48 hours of confirmation." },
                  { num: "04", title: "Dedicated Support", text: "A personal account manager via WhatsApp for every partner." },
                ].map((b) => (
                  <div key={b.num} className="flex gap-5 group">
                    <span className="font-display text-3xl lg:text-4xl text-gold font-bold leading-none shrink-0 w-14">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-lg lg:text-xl font-semibold mb-1.5 group-hover:text-gold transition-colors">
                        {b.title}
                      </h4>
                      <p className="text-sm text-primary-foreground/65 leading-relaxed">
                        {b.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
