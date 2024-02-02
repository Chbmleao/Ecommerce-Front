import styled, {css} from "styled-components";
import { useState } from "react";
import { primaryColor } from "@/utils/colors";

const Box = styled.div`
  max-width: 40vw;
  height: fit-content;
  background-color: #fff;
  padding: 2vh;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    max-width: 90vw;
  }
`;

const BoxImage = styled.img`
  height: 50vh;
  max-width: 90%;
  object-fit: contain;
  display: block;
  margin: 10px 0 20px;
  @media (max-width: 768px) {
    height: 25vh;
    width: 100%;
    margin: 5px 0 5px;
  }
`;

const ImageButtons = styled.div`
  overflow: hidden;
  display: flex;
  gap: 20px;
  max-width: 100%;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding: 10px;
  padding-bottom: 0;
  img {
    max-height: 50px;
    width: 80px;
  }
`;

const commonImageStyles = css`
  cursor: pointer;
  object-fit: contain;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  transition: transform 0.2s;
  padding: 6px;
  &:hover {
    transform: scale(1.05);
    padding: 5px;
    border: 2px solid ${primaryColor};
  }
`;

const ImageButton = styled.img`
  ${commonImageStyles}
`;

const SelectedButton = styled.img`
  ${commonImageStyles}
  border: 1px solid ${primaryColor};
`;

export default function ImageBox({images, title}) {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <Box>
      <BoxImage src={currentImage} alt={title}/>
      <ImageButtons>
        {images.map((image, index) => (
          image === currentImage ? (
            <SelectedButton key={index} src={image} alt={title} onMouseEnter={() => setCurrentImage(image)}/>
          ) : (
            <ImageButton key={index} src={image} alt={title} onMouseEnter={() => setCurrentImage(image)}/>
          )
        ))}
      </ImageButtons>
    </Box>
  );
}