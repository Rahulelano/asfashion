import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

const AdminSettings = () => {
  const [shipping, setShipping] = useState({ amount: 60, threshold: 999 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("http://localhost:9200/api/settings");
      const data = await res.json();
      const shippingSetting = data.find((s: any) => s.key === "shipping_charge");
      if (shippingSetting) {
        setShipping(shippingSetting.value);
      }
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("http://localhost:9200/api/settings/shipping_charge", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: shipping }),
      });
      if (res.ok) {
        toast.success("Shipping settings updated successfully");
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Store Settings</h2>
      
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Configuration</CardTitle>
            <CardDescription>Manage how much you charge for shipping and when it becomes free.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shipping_amount">Standard Shipping Charge (₹)</Label>
                  <Input 
                    id="shipping_amount" 
                    type="number" 
                    value={shipping.amount} 
                    onChange={(e) => setShipping({ ...shipping, amount: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipping_threshold">Free Shipping Threshold (₹)</Label>
                  <Input 
                    id="shipping_threshold" 
                    type="number" 
                    value={shipping.threshold} 
                    onChange={(e) => setShipping({ ...shipping, threshold: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={saving} className="w-full">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Shipping Settings
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
