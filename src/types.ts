export type Product = {
  id: string;
  name: string;
  brandId: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  colors: string[];
  sizes: string[];
  isFeatured: boolean;
  tags: string[];
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  description: string;
  foundedYear: number;
  specialty: string;
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
};
