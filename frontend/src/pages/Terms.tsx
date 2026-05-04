import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-8">Terms & Conditions</h1>
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using asfashion.in, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in India.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">2. Online Store Terms</h2>
              <p>Our store is hosted on a secure platform. We use Razorpay as our primary payment gateway. By placing an order, you agree to the payment terms of both AS Fashion and Razorpay.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary mb-3">3. Payments</h2>
              <p>All payments are processed securely through Razorpay. We support Credit Cards, Debit Cards, Net Banking, UPI, and Wallets. AS Fashion does not store any of your sensitive payment information.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary mb-3">4. Product Accuracy</h2>
              <p>We strive to display our products as accurately as possible. However, actual colors and textures may vary slightly due to monitor settings and photographic lighting.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary mb-3">5. Intellectual Property</h2>
              <p>All content on this site, including images, text, and logos, is the property of AS Fashion and is protected by Indian copyright laws.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
