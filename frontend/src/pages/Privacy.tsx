import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-8">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">Data Collection</h2>
              <p>We collect information when you register, place an order, or subscribe to our newsletter. This includes your name, email, and shipping address.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-primary mb-3">Secure Payments</h2>
              <p>Your payment information is processed exclusively by Razorpay. We do not have access to your credit card or bank details. Razorpay adheres to the highest standards of PCI-DSS compliance.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary mb-3">Cookies</h2>
              <p>We use cookies to enhance your browsing experience, remember your cart items, and understand how you use our site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary mb-3">Third Parties</h2>
              <p>We do not sell or trade your personal information. We only share data with trusted partners (like shipping companies and Razorpay) to fulfill your orders.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
