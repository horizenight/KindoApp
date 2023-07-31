import React from "react";
import styled from "styled-components";
import { Banner, Logo } from "../components";
import Facebook from "../Icons/Facebook";
import Instagram from "../Icons/Instagram";
import Twitter from "../Icons/Twitter";
import LinkedIn from "../Icons/LinkedIn";

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  position: relative;
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 75%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.text};

  @media (max-width: 48em) {
    width: 90%;
  }

  h1 {
    font-size: ${(props) => props.theme.fontxxxl};
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 48em) {
    width: 100%;
  }
`;

const IconList = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem auto;

  & > * {
    padding-right: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const MenuItems = styled.ul`
  list-style: none;
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;

  @media (max-width: 48em) {
    display: none;
  }
`;

const Item = styled.li`
  width: fit-content;
  cursor: pointer;

  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    border-radius: 3px;
    background: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
`;

const Bottom = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: underline;
  }

  @media (max-width: 48em) {
    flex-direction: column;
    width: 100%;

    span {
      margin-bottom: 1rem;
    }
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const Footer = () => {
  const scrollTo = (id) => {
    let element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <Section>
      <Banner />

      <Container>
        <Left>
          {/* <Logo /> */}
          {/* Logo */}
          <IconList>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <LinkedIn />
            </a>
          </IconList>
        </Left>

        <MenuItems>
          {/* <Item onClick={() => scrollTo("home")}>Home</Item> */}
          <Item onClick={() => scrollTo("about")}>Home</Item>
          {/* <Item onClick={() => scrollTo("roadmap")}>Features</Item> */}
          {/* <Item onClick={() => scrollTo("showcase")}>Showcase</Item> */}
          {/* <Item onClick={() => scrollTo("team")}>Team</Item> */}
          {/* <Item onClick={() => scrollTo("faq")}>FAQ</Item> */}
        </MenuItems>
      </Container>

      <Bottom>
        <Address>
          <div>Lichtenbergstr. 6</div>
          <div>85748 Garching b. München</div>
        </Address>
        <ContactInfo>
          <div>Represented by</div>
          <div>Prof. Dr. Helmut Schönenberger (CEO)</div>
          <div>Stefan Drüssler</div>
          <div>Claudia Frey</div>
          <div>Christian Mohr</div>
          <div>Thomas Zeller</div>
          <div>Contact Information</div>
          <div>+49 89-18 94 69-0</div>
          <div>+49 89-18 94 69-1199</div>
          <div>
            <a
              href="https://www.digitalproductschool.io/legal-disclosure"
              target="_blank"
              rel="noopener noreferrer"
            >
              Legal Notice
            </a>
          </div>
          <div>
            <a
              href="https://www.digitalproductschool.io/privacy-policy-utum"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </ContactInfo>
      </Bottom>
    </Section>
  );
};

export default Footer;
