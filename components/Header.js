import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Center from "@/components/Center";
import { CartContext } from "@/components/CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: ${(props) => (props.isCurrentPage ? "white" : "#aaa")};
  text-decoration: none;
`;

export default function Header() {
  const {getCartLength} = useContext(CartContext);
  const router = useRouter();

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav>
            <NavLink 
              href={"/"} 
              isCurrentPage={router.pathname === "/"}
            >
              Home
            </NavLink>
            <NavLink 
              href={"/products"} 
              isCurrentPage={router.pathname.includes("/products")}
            >
              All products
            </NavLink>
            <NavLink 
              href={"/categories"} 
              isCurrentPage={router.pathname.includes("/categories")}
            >
              Categories
            </NavLink>
            <NavLink 
              href={"/account"} 
              isCurrentPage={router.pathname.includes("/account")}
            >
              Account
            </NavLink>
            <NavLink 
              href={"/cart"} 
              isCurrentPage={router.pathname.includes("/cart")}
            >
              Cart ({getCartLength()})
            </NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
