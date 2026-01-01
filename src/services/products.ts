const BASE_URL = 'https://api.escuelajs.co/api/v1';

const services ={
  products: `${BASE_URL}/products`,
  categories: `${BASE_URL}/categories`,
}

const ENDPOINTS = {
  products: `${services.products}`,
  productById: (id:string | number) => `${services.products}/${id}`,
  relatedProducts:(id:string | number) => `${services.products}/${id}/related`,
  categories: `${services.categories}`,
  productsByCategory: (id:string | number) => `${services.categories}/${id}/products`,
}


export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}
export const getProducts = async ({ page }: { page: number }): Promise<Product[]> => {
  const offset = page * 10;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${ENDPOINTS.products}?limit=10&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getProductById = async (id: string | number): Promise<Product> => {
  const response = await fetch(`${ENDPOINTS.productById(id)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const getRelatedProducts = async (id: string | number): Promise<Product[]> => {
  const response = await fetch(`${ENDPOINTS.relatedProducts(id)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${ENDPOINTS.categories}`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};


export const getProductsByCategory = async ({ page,id }: { page: number,id:string|number }): Promise<Product[]> => {
  const offset = page * 10;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${ENDPOINTS.productsByCategory(id)}?limit=10&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};







