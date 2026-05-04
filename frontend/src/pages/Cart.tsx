import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { displayRazorpay } = useRazorpay();
  const [shippingConfig, setShippingConfig] = useState({ amount: 60, threshold: 999 });

  useEffect(() => {
    fetch("http://localhost:9200/api/settings")
      .then(res => res.json())
      .then(data => {
        const config = data.find((s: any) => s.key === "shipping_charge");
        if (config) setShippingConfig(config.value);
      })
      .catch(err => console.error("Failed to load shipping config:", err));
  }, []);

  const shippingCharge = totalPrice > shippingConfig.threshold ? 0 : shippingConfig.amount;
  const grandTotal = totalPrice + shippingCharge;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-10 text-primary">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-secondary/30 rounded-3xl border border-dashed border-border">
              <div className="h-20 w-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild size="lg" variant="gold">
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-8 space-y-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 md:gap-6 p-4 bg-background border border-border rounded-2xl group hover:border-gold/50 transition-colors">
                    <div className="h-24 w-24 md:h-32 md:w-32 bg-secondary rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-primary">{item.name}</h3>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.category} • Size: {item.selectedSize}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-border rounded-lg bg-secondary/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="p-2 hover:text-gold transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="p-2 hover:text-gold transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-bold text-primary text-lg">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="glass p-8 rounded-3xl border border-border/50 sticky top-28">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  {/* Checkout Form */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                        id="customerName"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                        id="customerEmail"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                        id="customerPhone"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Shipping Address</label>
                      <textarea 
                        placeholder="House No, Street, City, State, Pincode"
                        rows={3}
                        className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none"
                        id="customerAddress"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className={shippingCharge === 0 ? "text-green-600 font-medium" : ""}>
                        {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
                      </span>
                    </div>
                    <div className="border-t border-border pt-4 mt-4 flex justify-between font-bold text-xl text-primary">
                      <span>Total</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      size="xl" 
                      className="w-full bg-primary text-primary-foreground font-bold h-14 rounded-xl btn-shine"
                      onClick={() => {
                        const name = (document.getElementById('customerName') as HTMLInputElement).value;
                        const email = (document.getElementById('customerEmail') as HTMLInputElement).value;
                        const phone = (document.getElementById('customerPhone') as HTMLInputElement).value;
                        const address = (document.getElementById('customerAddress') as HTMLInputElement).value;
                        
                        if (!name || !email || !phone || !address) {
                          toast.error("Please fill in all details including address.");
                          return;
                        }

                        displayRazorpay({
                          amount: grandTotal,
                          orderId: `ORD_${Date.now()}`,
                          customerName: name,
                          customerEmail: email,
                          customerContact: phone,
                          customerAddress: address,
                          items: cart,
                        });
                      }}
                    >
                      Pay with Razorpay
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                      Secure checkout powered by Razorpay
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="h-8 w-8 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <p>Dispatch within 24-48 hours from Tirupur.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
