import React from "react";
import styled, { ThemeProvider } from "styled-components";

import Button from "./Button";


import { dark } from "../styles/Themes";

const Section = styled.section`
  width: 100vw;
  height: 25rem;
  position: relative;
  border-top: 2px solid ${(props) => props.theme.text};
  border-top: 2px solid ${(props) => props.theme.text};

  background-color: ${(props) => `rgba(${props.theme.textRgba}, 0.9)`};

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  @media (max-width: 48em) {
    height: 15rem;
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
  

  img {
    width: 20rem;
    height: auto;
    padding:1rem;
    border-radius:2rem;
  }

  @media (max-width: 48em) {
    img {
      width: 10rem;
      height: auto;
    }
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  color: ${(props) => props.theme.body};
  padding: 1rem 2rem;
  z-index: 10;
  width: 35%;

  text-transform: capitalize;
  text-shadow: 1px 1px 2px ${(props) => props.theme.text};

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
    text-align: center;
    width: 40%;
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
    padding: 2rem 0;
    width: 100%;
  }
`;

const BtnContainer = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
  font-size: ${(props) => props.theme.fontlg};

  @media (max-width: 48em) {
    width: 100%;
    justify-content: center;
  }
`;

const Banner = () => {
  return (
    <Section>
      <ImgContainer>
        {/* <img src={img1} alt="The Weirdos" />
        <img src={img2} alt="The Weirdos" />
        <img src={img3} alt="The Weirdos" />
        <img src={img4} alt="The Weirdos" />
        <img src={img5} alt="The Weirdos" />
        <img src={img6} alt="The Weirdos" /> */}
        <img src="https://th.bing.com/th?id=OSK.HEROxo97ITymBhQPwcM3EX8FK2tnvzII5WnjPebMeVCfqgU&w=472&h=280&c=1&rs=2&o=6&pid=SANGAM" alt="Munich" /> 
        <img src="https://images.pexels.com/photos/1885810/pexels-photo-1885810.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Munich" /> 
        <img src="https://images.pexels.com/photos/2127002/pexels-photo-2127002.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Munich" /> 
        <img src="https://images.pexels.com/photos/4213371/pexels-photo-4213371.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Munich" /> 
   
        <img src="https://images.pexels.com/photos/221519/pexels-photo-221519.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Munich" /> 

      
      </ImgContainer>

      <Title>
        Explore <br /> Munich !
      </Title>
      <ThemeProvider theme={dark}>
        <BtnContainer>
          <Button text="Try Our App" link="https://www.figma.com/proto/4YwBoVlhgzSJfEPQc2PDaJ/Histourists-App?node-id=747-13938&scaling=scale-down&page-id=747%3A13917&starting-point-node-id=747%3A13918" />
        </BtnContainer>
      </ThemeProvider>
    </Section>
  );
};

export default Banner;
