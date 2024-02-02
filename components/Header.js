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
  color: ${(props) => (props.is_current_page ? "white" : "#aaa")};
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
              is_current_page={(router.pathname === "/").toString()}
            >
              Home
            </NavLink>
            <NavLink 
              href={"/products"} 
              is_current_page={(router.pathname.includes("/products")).toString()}
            >
              All products
            </NavLink>
            <NavLink 
              href={"/categories"} 
              is_current_page={(router.pathname.includes("/categories")).toString()}
            >
              Categories
            </NavLink>
            <NavLink 
              href={"/account"} 
              is_current_page={(router.pathname.includes("/account")).toString()}
            >
              Account
            </NavLink>
            <NavLink 
              href={"/cart"} 
              is_current_page={(router.pathname.includes("/cart")).toString()}
            >
              Cart ({getCartLength()})
            </NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
