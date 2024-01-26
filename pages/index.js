import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";

export default function HomePage({featuredProduct, newProducts}) {
  return (
    <div>
      <Header/>
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
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