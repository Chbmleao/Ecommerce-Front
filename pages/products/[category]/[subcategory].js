import { mongooseConnect } from '@/lib/mongoose';
import ProductsPage, { returnProps } from '@/pages/products';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';

export default function SubcategoryPage({products, categories}) {
  return <ProductsPage products={products} categories={categories}/>;
}

export async function getServerSideProps({params}) {
  mongooseConnect();

  const subcategoryName = params.subcategory;
  const subcategory = await Category.findOne({ name: subcategoryName });

  if (!subcategory) {
    returnProps([], []);
  }

  const products = await Product.find({ category: subcategory._id });
  return returnProps(products, []);
}