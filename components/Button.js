import styled, {css} from "styled-components";
import { primaryColor } from "@/utils/colors";

export const ButtonStyle = css`
  background-color: #222;
  color: #fff;
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg {
    height: 1.2em;
  }
  ${props => props.marginRight && css`
    svg {
      margin-right: ${props.marginRight};
    }
  `}
  ${props => props.black && css`
    background-color: #222;
  `}
  ${props => props.outline && css`
    background-color: transparent;
    border: 1px solid #222;
    color: #222;
  `}
  ${props => props.primary && css`
    background-color: ${primaryColor};
    border: 1px solid ${primaryColor};
  `}
  ${props => props.size === "l" && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg {
      height: 1.1em;
      margin-right: 10px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...props }) {
  return (
    <StyledButton {...props}>{children}</StyledButton>
  );
}