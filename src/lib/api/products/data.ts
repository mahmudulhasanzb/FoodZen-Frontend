import { baseUrl } from '../baseUrl';

// get store produtcs
// following simple fetch function
export const getStoreProductsByStoreEmail = async (
  path: string,
  storeEmail: string,
) => {
  const res = await fetch(`${baseUrl}${path}/${storeEmail}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};

// get product by id
export const getProductById = async (path: string, id: string) => {
  const res = await fetch(`${baseUrl}${path}/${id}`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};
