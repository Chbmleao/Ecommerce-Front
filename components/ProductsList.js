import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding: 1rem 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0 20px;
  margin-bottom: 1rem;
`;

export default function ProductsList({title, products}) {
  return (
    <Center>
      <Title>{title}</Title>
      <ProductsGrid>
        {products?.length > 0 && products.map((product) => (
          <ProductBox {...product}/>
        ))}
      </ProductsGrid>
    </Center>
  );
}