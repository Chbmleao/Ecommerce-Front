import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";

const ColumnsWrapper = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: 1.3fr .7fr;
  gap: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0,0,0,0.1);
`;

export default function CartPage() {
  const { cartProducts: cartProductsIds} = useContext(CartContext);
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
    <div>
      <Header/>
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Cart</h1>
            <div>
              {products?.map((product) => {
                return (
                  <div key={product._id}>
                    <div>{product.title}</div>
                    <div>{product.quantity}</div>
                  </div>
                );
              })}
            </div>
          </Box>
          <Box>
            <h1>Cart</h1>
          </Box>
        </ColumnsWrapper>
      </Center>
    </div>
  );
}

async function getCartProducts(cartProductsIds) {
  const cartProducts = [];
  const productsIds = [];

  for (const productId of cartProductsIds) {
    const existingItem = cartProducts.find((item) => item._id === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const item = {
        _id: productId,
        quantity: 1,
      };
      cartProducts.push(item);
      productsIds.push(productId);
    }
  }

  if (productsIds.length === 0) {
    return Promise.resolve([]);
  }

  return axios.post("/api/cart", {ids: productsIds})
    .then((res) => {
      const products = res.data;
      for (const product of products) {
        const item = cartProducts.find((item) => item._id === product._id);
        product.quantity = item.quantity;
      }

      return products;
    }
  );
}