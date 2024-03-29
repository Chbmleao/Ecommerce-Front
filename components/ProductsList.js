import styled from "styled-components";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding: 1rem 0;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0 20px;
  margin-bottom: 1rem;
`;

export default function ProductsList({title, products}) {
  return (
    <div>
      <Title>{title}</Title>
      <ProductsGrid>
        {products?.length > 0 && products.map((product) => (
          <ProductBox key={product._id} {...product}/>
        ))}
      </ProductsGrid>
    </div>
  );
}