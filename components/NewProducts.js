import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding: 1rem 0;
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <ProductsGrid>
        {products?.length > 0 && products.map((product) => (
          <ProductBox {...product}/>
        ))}
      </ProductsGrid>
    </Center>
  );
}