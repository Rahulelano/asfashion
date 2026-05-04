import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const WA = "https://wa.me/919626833050?text=Hi%20I%20want%20to%20know%20about%20wholesale%20and%20reseller%20for%20AS%20Fashion";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("http://localhost:9200/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully! We will get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h1 className="font-display text-4xl lg:text-6xl font-black text-primary mb-6">Get in Touch</h1>
                  <p className="text-xl text-muted-foreground mb-12">
                    Have questions about our products or wholesale opportunities? We're here to help.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Call Us</h3>
                        <p className="text-muted-foreground">+91 96268 33050</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Email Us</h3>
                        <p className="text-muted-foreground">asfashion.in29@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Visit Us</h3>
                        <p className="text-muted-foreground">Tirupur, Tamil Nadu, India</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass p-8 rounded-3xl border border-border/50 shadow-xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input name="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input name="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input name="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea name="message" placeholder="Tell us what you're looking for..." className="min-h-[150px]" required />
                    </div>
                    <Button disabled={loading} className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl">
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default Contact;
