import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 1rem;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0,0,0,0.1);
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;

const Title = styled(Link)`
  font-size: .9rem;
  font-weight: bold;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default function ProductBox({_id, title, price, images}) {
  const {addProductToCart} = useContext(CartContext);

  const handleAddToCart = () => {
    addProductToCart(_id);
  };

  const url = "/product/" + _id;
  return (
    <div>
      <WhiteBox href={url} >
        <div>
          <img src={images[0]} alt={title}/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button primary="true" onClick={handleAddToCart}>
            <CartIcon />
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </div>    
  );
}