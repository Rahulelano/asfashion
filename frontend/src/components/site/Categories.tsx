import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import catTshirts from "@/assets/cat-tshirts.jpg";
import catTrack from "@/assets/cat-trackpants.jpg";
import catShorts from "@/assets/cat-shorts.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";

const CATS = [
  { name: "T-Shirts", count: "120+ Styles", image: catTshirts, span: "lg:col-span-2 lg:row-span-2" },
  { name: "Track Pants", count: "60+ Styles", image: catTrack, span: "" },
  { name: "Shorts", count: "40+ Styles", image: catShorts, span: "" },
  { name: "Hoodies", count: "50+ Styles", image: catHoodies, span: "lg:col-span-2" },
];

export const Categories = () => {
  return (
    <section id="categories" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-medium">
              Shop by Category
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05] text-balance max-w-2xl">
              Curated essentials, <em className="font-script font-normal text-gold">crafted</em> for you
            </h2>
          </div>
          <Link to="/shop" className="link-underline text-sm uppercase tracking-[0.2em] font-medium text-primary self-start lg:self-auto">
            View all collections →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-6 lg:h-[720px]">
          {CATS.map((c, i) => (
            <Link
              key={c.name}
              to={`/shop?category=${c.name}`}
              className={`hover-zoom relative overflow-hidden bg-secondary group cursor-pointer ${c.span} ${
                i === 1 || i === 2 ? "h-80 lg:h-auto" : "h-96 lg:h-auto"
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                width={800}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-primary-foreground">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2 font-medium">
                  {c.count}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-display font-bold text-3xl lg:text-4xl leading-tight">
                    {c.name}
                  </h3>
                  <div className="h-11 w-11 shrink-0 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:text-gold-foreground group-hover:border-gold group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
