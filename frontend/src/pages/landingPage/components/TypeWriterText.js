import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import Button from "./Button";

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  width: 85%;
  color: ${(props) => props.theme.text};
  align-self: flex-start;
  z-index:1;
  color: white;
  
  span {
    text-transform: uppercase;
    font-family: "Akaya Telivigala", cursive;
  }

  .text-1 {
    color:#FFB6C1;
  }
  .text-2 {
    color:#FFB85C;
  }
  .text-3 {
    color:#B4E1E6;
  }

  @media (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};
  }
  @media (max-width: 48em) {
    align-self: center;
    text-align: center;
  }
  @media (max-width: 40em) {
    width: 90%;
  }
`;

const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${(props) => `rgba(${props.theme.textRgba}, 0.6)`};
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  width: 80%;
  align-self: flex-start;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }

  @media (max-width: 48em) {
    align-self: center;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  align-self: flex-start;

  @media (max-width: 48em) {
    align-self: center;
    text-align: center;

    button {
      margin: 0 auto;
    }
  }
`;

const TypeWriterText = () => {
  return (
    <>
      <Title>
        Discover a new era of Munich
        <Typewriter
          options={{ autoStart: true, loop: true }}
          onInit={(typewriter) => {
            typewriter
              .typeString('<span class="text-1">Tours.</span>')
              .pauseFor(2000)
              .deleteAll()
              .typeString('<span class="text-2">Exploring. </span>')
              .pauseFor(2000)
              .deleteAll()
              .typeString('<span class="text-3">Quests</span>')
              .pauseFor(2000)
              .deleteAll()
              .start();
          }}
        />
      </Title>
      <SubTitle>Bored of boring tours? Try Something New.</SubTitle>

      <ButtonContainer>
        <Button text="Explore" link="#about" />
      </ButtonContainer>
    </>
  );
};

export default TypeWriterText;
