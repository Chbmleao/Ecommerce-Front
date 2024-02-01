import Header from '@/components/Header';
import ProductsList from '@/components/ProductsList';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default function ProductsPage({products}) {
  return (
    <div>
      <Header />
      <ProductsList title="All Products" products={products}/>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}