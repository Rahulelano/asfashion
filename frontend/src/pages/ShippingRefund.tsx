import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const ShippingRefund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-8">Shipping & Refund Policy</h1>
          <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">Shipping Policy</h2>
              <div className="space-y-4">
                <p><strong>Processing Time:</strong> Orders are processed within 1-2 business days. Direct dispatch from our Tirupur hub.</p>
                <p><strong>Shipping Charges:</strong> Free shipping on orders above ₹999. For orders below ₹999, a flat fee of ₹60 is charged.</p>
                <p><strong>Delivery Time:</strong> Usually 3-7 business days across India.</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">Refund & Return Policy</h2>
              <div className="space-y-4">
                <p><strong>7-Day Returns:</strong> We offer a 7-day return policy for unused items in original packaging with tags intact.</p>
                <p><strong>Refund Process:</strong> Once your return is received and inspected, we will initiate a refund. </p>
                <p><strong>Payment Reversals:</strong> Refunds for payments made via Razorpay will be credited back to the original payment source within 5-7 business days.</p>
                <p><strong>Non-Returnable:</strong> For hygiene reasons, innerwear and customized items are not eligible for return unless defective.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary mb-3">Damaged Goods</h2>
              <p>If you receive a damaged product, please contact us within 24 hours of delivery at asfashion.in29@gmail.com with photos of the damage.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingRefund;
