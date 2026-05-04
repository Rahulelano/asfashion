import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      {/* Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-2">
                Join the <em className="font-script font-normal text-gold">inner circle</em>
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                Early drops, private sales, and 10% off your first order.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-lg lg:ml-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-primary-foreground/25 px-5 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold transition-colors rounded-sm"
              />
              <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto h-[50px] font-bold tracking-widest">
                SUBSCRIBE
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="col-span-2">
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="font-display font-black text-3xl text-primary-foreground">AS</span>
              <span className="font-script text-3xl text-gold leading-none translate-y-1">Fashion</span>
            </div>
            <p className="text-sm text-primary-foreground/65 leading-relaxed mb-6 max-w-sm">
              Premium menswear crafted in Tirupur, India. T-shirts, hoodies, track pants and shorts — direct to you and your store.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-gold-foreground transition-all"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4 grayscale opacity-60">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-6" />
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors">Shop</Link></li>
              <li><Link to="/wholesale" className="hover:text-gold transition-colors">Wholesale</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-5">Policies</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link to="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/shipping-refund" className="hover:text-gold transition-colors">Shipping & Refund</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  3/412/7472A, Housing Unit,<br />
                  Mudhalipalayam,<br />
                  Near Mani Mahal,<br />
                  Tirupur, Tamil Nadu — 641606
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <a href="tel:+919626833050" className="hover:text-gold transition-colors">+91 96268 33050</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a href="mailto:asfashion.in29@gmail.com" className="hover:text-gold transition-colors">asfashion.in29@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} AS Fashion. All rights reserved.</p>
          <p>Crafted with care in Tirupur, Tamil Nadu.</p>
        </div>
      </div>
    </footer>
  );
};
