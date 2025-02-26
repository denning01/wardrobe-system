export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ClothingItem {
  id: number;
  name: string;
  category: string;
  color: string;
  size: string;
  brand?: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}