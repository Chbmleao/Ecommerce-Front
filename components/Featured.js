import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  color: #666;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      max-width: 80%;
    }
    div:first-child {
      order:2;
    }
    font-size: .8em;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  justify-content: center;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Featured({product}) {
  const {addProductToCart} = useContext(CartContext);

  const handleAddToCart = () => {
    addProductToCart(product._id);
  };

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
          <div>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <ButtonsWrapper>
              <ButtonLink 
                href={"/product/" + product._id} 
                outline="true"
              >
                Read more
              </ButtonLink>
              <Button primary="true" marginRight="5px" onClick={handleAddToCart}>
                <CartIcon />
                Add to cart
              </Button>
            </ButtonsWrapper>
          </div>
          </Column>
          <Column>
            <img src="https://carlos-leao-next-ecommerce.s3.amazonaws.com/1706210756201.png" alt={product.title}></img>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}