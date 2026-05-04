import { Award, IndianRupee, Truck, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: Award, title: "Premium Quality", text: "Heavyweight cotton, reinforced stitching, shrink-tested fabrics." },
  { icon: IndianRupee, title: "Affordable Pricing", text: "Factory-direct from Tirupur — pay for craft, not for markups." },
  { icon: Truck, title: "Fast Delivery", text: "Pan-India dispatch within 48 hours, tracked end-to-end." },
  { icon: ShieldCheck, title: "Trusted Supplier", text: "500+ resellers and counting — backed by easy returns." },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">
            Why Choose Us
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05] text-balance">
            Built on quality. <em className="font-script font-normal text-gold">Loved</em> for value.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ITEMS.map((it, i) => (
            <div
              key={it.title}
              className="group relative bg-background border border-border p-8 lg:p-10 hover:shadow-elegant hover:-translate-y-1 hover:border-primary/20 transition-all duration-500"
            >
              <span className="absolute top-5 right-5 font-display text-sm text-muted-foreground/50 tracking-widest">
                0{i + 1}
              </span>
              <div className="h-14 w-14 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                <it.icon className="h-6 w-6 text-primary group-hover:text-gold-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-xl lg:text-2xl text-primary mb-3">
                {it.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {it.text}
              </p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
