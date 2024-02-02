import { mongooseConnect } from '@/lib/mongoose';
import ProductsPage, { returnProps } from '@/pages/products';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';

export default function CategoryPage({products, categories}) {
  return <ProductsPage products={products} categories={categories}/>;
}

export async function getServerSideProps({params}) {
  mongooseConnect();

  const categoryName = params.category;
  const category = await Category.findOne({ name: categoryName });
    
  if (!category) {
    return returnProps([], []);
  }

  const categories = await Category.find({ parent: category._id });
  const categoriesIds = categories.map((category) => category._id);
  categoriesIds.push(category._id);
  const products = await Product.find({ category: { $in: categoriesIds } });
  return returnProps(products, categories);
}