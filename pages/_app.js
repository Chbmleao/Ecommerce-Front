import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #f2f2f2;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
        />
      </Helmet>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </div>
  );
}
