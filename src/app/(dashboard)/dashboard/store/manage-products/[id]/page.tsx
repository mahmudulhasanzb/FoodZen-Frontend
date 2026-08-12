import { getProductById } from '@/src/lib/api/products/data';
import ProductUpdateForm from './ProductUpdateForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductUpdatePage = async ({ params }: PageProps) => {
  const { id } = await params;
  let product = null;

  try {
    product = await getProductById('/api/product', id);
    console.log(product)
  } catch (error) {
    console.error('Failed to fetch product by id:', error);
  }

  return <ProductUpdateForm product={product} id={id} />;
};

export default ProductUpdatePage;