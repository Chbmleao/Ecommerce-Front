import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Table = styled.table`
  width: 100%;
  text-align: left;
  th {
    padding: 10px;
    color: #C5C5C5;
    font-size: 12px;
    text-transform: uppercase;
  }
  td {
    border-top: 1px solid rgba(0,0,0,.1);
    padding: 20px 0 10px;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const QuantityItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 5px;
  img {
    object-fit: contain;
    max-height: 100px;
    max-width: 100px;
  }
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,.1);
  background-color: transparent;
  font-size: 1.1rem;
  font-weight: normal;
  color: #C5C5C5;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    background-color: #C5C5C5;
    color: white;
  }
`;

export default function CartTable ({products}) {
  const { addProductToCart, removeProductFromCart } = useContext(CartContext);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <ImageBox>
                  <img src={product.images[0]} alt={product.title}/>
                </ImageBox>
                {product.title}
              </td>
              <td>
                <QuantityItem>
                  <QuantityButton onClick={() => removeProductFromCart(product._id)}>-</QuantityButton>
                  {product.quantity}
                  <QuantityButton onClick={() => addProductToCart(product._id)}>+</QuantityButton>
                </QuantityItem>
              </td>
              <td>
                ${product.price}
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              Total
            </td>
            <td>
              
                ${products.reduce((acc, product) => {
                  return acc + product.price * product.quantity;
                }, 0)}
              
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )  
}