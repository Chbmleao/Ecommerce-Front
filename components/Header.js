import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Center from "@/components/Center";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {  
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: ${(props) => (props.is_current_page ? "white" : "#aaa")};
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 35px;
  height: 35px;
  border: none;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const {getCartLength} = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter();

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
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
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
