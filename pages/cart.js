import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import CartTable from "@/components/CartTable";
import { CartContext } from "@/components/CartContext";
import ButtonLink from "@/components/ButtonLink";

const CartPageWrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
`;

const ColumnsWrapper = styled.div`
  max-height: 80vh;
  margin: 5vh 0;
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  h2 {
    margin-top: 0;
  }
`;

const Box = styled.div`
  height: fit-content;
  background-color: #fff;
  padding: 2vh;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0,0,0,0.1);
`;

const ScrollableBox = styled(Box)`
  height: 75vh;
  overflow: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  font-size: .8rem;
`;

const AddressInput = styled.div`
  display: flex;
  gap: 5px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

export default function CartPage() {
  const { cartProducts: cartProductsIds } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const result = await getCartProducts(cartProductsIds);
        setProducts(result || []);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, [cartProductsIds]);

  return (
    <CartPageWrapper>
      <Header/>
      <Center>
        <ColumnsWrapper>
          <ScrollableBox>
            <h2>Cart</h2>
            <CartTable products={products}/>
          </ScrollableBox>
          <Box>
            <h2>Order information</h2>
            <div>
              <Input placeholder="Name"/>
              <Input placeholder="Email"/>
              <AddressInput>
                <Input placeholder="City"/>
                <Input placeholder="Postal Code"/>
              </AddressInput>
              <Input placeholder="Street address"/>
              <Input placeholder="Country"/>
              <ButtonWrapper>
                <ButtonLink href="/checkout">Continue to payment</ButtonLink>
              </ButtonWrapper>
            </div>
          </Box>
        </ColumnsWrapper>
      </Center>
    </CartPageWrapper>
  );
}

async function getCartProducts(cartProductsIds) {
  return axios
    .post("/api/cart", {ids: cartProductsIds})
    .then((res) => {
      const products = res.data;
      for (const product of products) {
        product.quantity = 0;
        for (const productId of cartProductsIds) {
          if (product._id === productId) {
            product.quantity++;
          }
        }
      }
      return products;
    }
  );
}