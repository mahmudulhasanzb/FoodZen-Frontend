import { baseUrl } from "../baseUrl";

// Delete Product by id
export const deleteProductById = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};
