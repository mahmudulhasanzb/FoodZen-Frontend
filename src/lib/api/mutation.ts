import { baseUrl } from './baseUrl';

export const serverMutation = async (path: string, method: string, data: any) => {
  const formatedPath = path.startsWith('/') ? path : `${path}`;
  const res = await fetch(`${baseUrl}${formatedPath}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
