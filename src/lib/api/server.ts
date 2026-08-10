import { baseUrl } from './baseUrl';

// serverFetch
export const serverFetch = async (path: string) => {
  const formatedPath = path.startsWith('/') ? path : `${path}`;
  const res = await fetch(`${baseUrl}${formatedPath}`, { cache: 'no-store' });

  if (!res.ok) {
    console.error(
      `Fetch error: ${res.status} ${res.statusText} for ${formatedPath}`,
    );
    return null;
  }
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`JSON parse error for ${formatedPath}:`, error);
  }
};

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
