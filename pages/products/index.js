import styled from 'styled-components';
import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductsList from '@/components/ProductsList';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { useRouter } from 'next/router';
import BeforeContent from '@/components/BeforeContent';

const ColumnsWrapper = styled.div`
  margin: 5vh 0;
  display: grid;
  grid-template-columns: 0.3fr 1.7fr;
  gap: 40px;
  h2 {
    margin-top: 0;
  }
  text-transform: capitalize;
`;

const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    cursor: pointer;
    width: fit-content;
    margin: 5px 0px;
    font-size: .8em;
  }
`;

export default function ProductsPage({products, categories}) {
  const router = useRouter();
  const pathArray = router.asPath.split('/');
  const category = pathArray[pathArray.length - 1];

  function changePage(category) {
    router.push(`${router.asPath}/${category}`);
  }

  return (
    <div>
      <Header />
      <Center>
        <BeforeContent pathArray={pathArray}/>
        <ColumnsWrapper>
          <div>
            
            <h3>
              {category != "products" ? `${category}` : "All products"}
            </h3>
            <CategoriesList>
              {categories?.length > 0 && categories.map((category) => (
                <li key={category._id} onClick={() => changePage(category.name)}>{category.name}</li>
              ))}
            </CategoriesList>
          </div>
          <ProductsList products={products}/>
        </ColumnsWrapper>
      </Center>
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find();
  const categories = await Category.find({ parent: null });
  return returnProps(products, categories);
}

export function returnProps(products, categories) {
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}