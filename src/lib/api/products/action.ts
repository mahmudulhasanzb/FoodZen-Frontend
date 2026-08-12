import { baseUrl } from '../baseUrl';

// Delete Product by id
export const deleteProductById = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

// Update Product by id
export const updateProductById = async (data: any, id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/product/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('error', error);
  }
};
