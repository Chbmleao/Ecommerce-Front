import styled from "styled-components";
import { useContext } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import ImageBox from "@/components/ImageBox";
import Center from "@/components/Center";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";

const ColumnsWrapper = styled.div`
  max-height: 80vh;
  margin: 5vh 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  h2 {
    margin-top: 0;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      max-width: 80%;
    }
  }
`;

const PriceDiv = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  width: 100%;
`; 

export default function ProductPage({product}) {
  const {addProductToCart} = useContext(CartContext);

  const handleAddToCart = () => {
    addProductToCart(product._id);
  };

  return (
    <div>
      <Header />
      <Center>
        <ColumnsWrapper>
          <ImageBox {...product}/>
          <InfoBox>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <PriceDiv>
              <p>${product.price}</p>
              <Button size="l" onClick={handleAddToCart}>
                <CartIcon />
                Add to Cart
              </Button>
            </PriceDiv>
          </InfoBox>
        </ColumnsWrapper>
      </Center>
    </div>
  );
}

export async function getServerSideProps({params}) {
  const { id } = params;
  await mongooseConnect();
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}