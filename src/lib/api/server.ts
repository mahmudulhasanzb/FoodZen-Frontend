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
