import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";

const Bg = styled.div`
  background-color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
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
`;

export default function Featured({product}) {
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
                href={"/products/" + product._id} 
                outline="true"
              >
                Read more
              </ButtonLink>
              <Button primary="true" marginRight="5px">
                <CartIcon />
                Add to cart
              </Button>
            </ButtonsWrapper>
          </div>
          </Column>
          <Column>
            <img src="https://carlos-leao-next-ecommerce.s3.amazonaws.com/1706210756201.png"></img>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}