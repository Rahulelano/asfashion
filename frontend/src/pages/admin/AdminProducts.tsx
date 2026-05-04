import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Product } from "@/lib/products";

const API_URL = "http://localhost:9200/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
        console.error("Expected array but got:", data);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Note: We don't need to manually create the object if we send FormData directly
    // but we need to make sure the server can handle it.
    // The sizes need to be joined back to string for simple transport if they were modified
    // but since they come from an input, they are already strings.

    try {
      const fetchOptions: RequestInit = {
        method: editingProduct ? "PUT" : "POST",
        body: formData, // Send FormData directly
      };

      const url = editingProduct ? `${API_URL}/${editingProduct._id}` : API_URL;
      const res = await fetch(url, fetchOptions);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      const savedProduct = await res.json();
      
      if (editingProduct) {
        setProducts(products.map((p) => (p._id === savedProduct._id ? savedProduct : p)));
        toast.success("Product updated successfully");
      } else {
        setProducts([...products, savedProduct]);
        toast.success("Product added successfully");
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to save product");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Products</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" defaultValue={editingProduct?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" name="price" type="number" defaultValue={editingProduct?.price} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" defaultValue={editingProduct?.category} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images">Product Images (Multiple)</Label>
                  <Input id="images" name="images" type="file" accept="image/*" multiple required={!editingProduct} />
                  {editingProduct && <p className="text-xs text-muted-foreground">Select new files to replace all current images</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="was">Original Price (optional)</Label>
                  <Input id="was" name="was" type="number" defaultValue={editingProduct?.was || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tag">Tag (e.g. New, Sale)</Label>
                  <Input id="tag" name="tag" defaultValue={editingProduct?.tag || ""} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="sizes">Sizes (comma separated)</Label>
                  <Input id="sizes" name="sizes" defaultValue={editingProduct?.sizes?.join(",")} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" defaultValue={editingProduct?.description} required />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editingProduct ? "Update Product" : "Save Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" onClick={() => { setEditingProduct(product); setIsDialogOpen(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(product._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
