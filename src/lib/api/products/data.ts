// get store produtcs

import { baseUrl } from "../baseUrl";

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
