import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Center from "@/components/Center";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import ProductsList from "@/components/ProductsList";

export default function HomePage({featuredProduct, newProducts}) {
  return (
    <div>
      <Header/>
      <Featured product={featuredProduct}/>
      <Center>
        <ProductsList title="New Arrivals" products={newProducts}/>
      </Center>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProduct = await getFeaturedProduct();
  const newProducts = await getNewProducts();
  return {
    props: {
      featuredProduct: featuredProduct,
      newProducts: newProducts,
    }
  };
}

async function getFeaturedProduct() {
  const featuredProductId = "65b2bd8235656e3919b53a21";
  const featuredProduct = await Product.findById(featuredProductId);
  return JSON.parse(JSON.stringify(featuredProduct));
}

async function getNewProducts() {
  const newProducts = await Product.find().sort({_id: -1}).limit(10);
  return JSON.parse(JSON.stringify(newProducts));
}