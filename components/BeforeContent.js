import styled from "styled-components";
import { useRouter } from 'next/router';

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
  font-size: .8em;
  color: #aaa;
  text-transform: capitalize;
`;

const StyledSpan = styled.span`
  cursor: pointer;
`;

const CurrentPage = styled.span`
  color: #222;
  cursor: auto; 
`;

export default function BeforeContent({pathArray}) {
  const router = useRouter();

  const elements = pathArray[pathArray.length - 1] === "products" ? 
    [<CurrentPage key="allProducts">All Products</CurrentPage>] :
    [<StyledSpan key="allProducts" onClick={() => router.push("/products")}>All Products</StyledSpan>];

  function changePage(category) {
    let pathString = "";
    let foundCategory = false;

    pathArray.some((path) => {
      if (path === category) {
        foundCategory = true;
        return true;
      }
      pathString += `${path}/`;
      return false;
    });

    if (foundCategory) {
      router.push(`${pathString}${category}`);
    } else {
      console.error(`${category} not found in pathArray`);
    }
  }

  pathArray.forEach((path, index) => {
    if (path !== "" && path !== "products") {
      elements.push(<span key={`arrow-${index}`}>&gt;</span>);
      if (index === pathArray.length - 1) {
        elements.push(<CurrentPage key={`path-${index}`}>{path}</CurrentPage>);
        return;
      }
      elements.push(<StyledSpan key={`path-${index}`} onClick={() => changePage(path)}>{path}</StyledSpan>); 
    }
  });

  return (
    <StyledDiv>
      {elements}
    </StyledDiv>
  );
}