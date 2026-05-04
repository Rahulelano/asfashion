import pTshirtWhite from "@/assets/p-tshirt-white.jpg";
import pTshirtBlack from "@/assets/p-tshirt-black.jpg";
import pHoodieBlack from "@/assets/p-hoodie-black.jpg";
import pShortsNavy from "@/assets/p-shorts-navy.jpg";
import pTrackGrey from "@/assets/p-track-grey.jpg";
import catHoodies from "@/assets/cat-hoodies.jpg";
import catTshirts from "@/assets/cat-tshirts.jpg";
import catTrack from "@/assets/cat-trackpants.jpg";
import catShorts from "@/assets/cat-shorts.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  was: number | null;
  image: string;
  images: string[];
  tag: string | null;
  description: string;
  sizes: string[];
}

export const PRODUCTS: Product[] = [
  { 
    id: "essential-crew-tee",
    name: "Essential Crew Tee", 
    category: "T-Shirts", 
    price: 599, 
    was: 899, 
    image: pTshirtWhite, 
    images: [pTshirtWhite, pTshirtBlack, catTshirts],
    tag: "New",
    description: "Our signature crew neck t-shirt, crafted from 100% premium combed cotton. Features a relaxed fit and durable double-needle stitching. Perfect for everyday wear or layering.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  { 
    id: "heavyweight-hoodie",
    name: "Heavyweight Hoodie", 
    category: "Hoodies", 
    price: 1499, 
    was: 1999, 
    image: pHoodieBlack, 
    images: [pHoodieBlack, catHoodies],
    tag: "Best Seller",
    description: "Premium heavyweight fleece hoodie designed for ultimate comfort and durability. Features a double-lined hood, kangaroo pocket, and ribbed cuffs and hem.",
    sizes: ["M", "L", "XL"]
  },
  { 
    id: "tapered-track-pant",
    name: "Tapered Track Pant", 
    category: "Track Pants", 
    price: 999, 
    was: null, 
    image: pTrackGrey, 
    images: [pTrackGrey, catTrack],
    tag: null,
    description: "Sleek and functional track pants with a modern tapered fit. Made from moisture-wicking fabric with four-way stretch for maximum mobility.",
    sizes: ["S", "M", "L", "XL"]
  },
  { 
    id: "coastline-shorts",
    name: "Coastline Shorts", 
    category: "Shorts", 
    price: 749, 
    was: 999, 
    image: pShortsNavy, 
    images: [pShortsNavy, catShorts],
    tag: "-25%",
    description: "Lightweight and versatile shorts perfect for the coast or the gym. Features quick-dry fabric and secure zip pockets.",
    sizes: ["S", "M", "L"]
  },
  { 
    id: "pocket-tee-onyx",
    name: "Pocket Tee — Onyx", 
    category: "T-Shirts", 
    price: 649, 
    was: null, 
    image: pTshirtBlack, 
    images: [pTshirtBlack, pTshirtWhite],
    tag: null,
    description: "Minimalist pocket tee in a deep onyx black. Made from our softest cotton jersey for a premium feel.",
    sizes: ["S", "M", "L", "XL"]
  },
  { 
    id: "marl-pullover-hoodie",
    name: "Marl Pullover Hoodie", 
    category: "Hoodies", 
    price: 1399, 
    was: 1799, 
    image: catHoodies, 
    images: [catHoodies, pHoodieBlack],
    tag: "New",
    description: "Classic marl grey pullover hoodie with a soft brushed interior. A timeless essential for any wardrobe.",
    sizes: ["M", "L", "XL", "XXL"]
  },
];
