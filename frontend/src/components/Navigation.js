import React, { useState } from "react";
import styled from "styled-components";
import { Logo, Button } from "../components";

const Section = styled.section`
  width: 100vw;
  background-color: ${(props) => props.theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;

  .mobile {
    display: none;
  }

  @media (max-width: 64em) {
    .desktop {
      display: none;
    }

    .mobile {
      display: inline-block;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  @media (max-width: 64em) {
    /* 1024 px */

    position: fixed;
    top: ${(props) => props.theme.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
    z-index: 50;
    background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.85)`};
    backdrop-filter: blur(2px);

    transform: ${(props) =>
      props.click ? "translateY(0)" : "translateY(1000%)"};

    transition: all 0.3s ease;

    flex-direction: column;
    justify-content: center;

    touch-action: none;
  }
`;

const MenuItem = styled.li`
  margin: 0 1rem;
  color: ${(props) => props.theme.text};
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

  @media (max-width: 64em) {
    /* 1024 px */
    margin: 1rem 0;

    &::after {
      display: none;
    }
  }
`;

const HamburgerMenu = styled.span`
  width: ${(props) => (props.click ? "2rem" : "1.5rem")};
  height: 2px;
  background: ${(props) => props.theme.text};

  position: absolute;
  top: 2rem;
  left: 50%;
  transition: all 0.3s ease;
  transform: ${(props) =>
    props.click
      ? "translateX(-50%) rotate(90deg)"
      : "translateX(-50%) rotate(0deg)"};

  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 64em) {
    /* 1024 px */
    display: flex;
  }

  &::after,
  &::before {
    content: " ";
    width: ${(props) => (props.click ? "1rem" : "1.5rem")};
    right: ${(props) => (props.click ? "-2px" : "0")};
    height: 2px;
    background: ${(props) => props.theme.text};
    position: absolute;
    transition: all 0.3s ease;
  }

  &::after {
    top: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(-40deg)" : "rotate(0)")};
  }

  &::before {
    bottom: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(40deg)" : "rotate(0)")};
  }
`;

const Navigation = () => {
  const [click, setClick] = useState(false);

  const scrollTo = (id) => {
    let element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    setClick(false);
  };

  return (
    <Section id="navigation">
      <NavBar>
        {/* <Logo /> */}
        Logo
        <HamburgerMenu click={click} onClick={() => setClick(!click)}>
          &nbsp;
        </HamburgerMenu>
        <Menu click={click}>
          {/* <MenuItem onClick={() => scrollTo("home")}>Home</MenuItem> */}
          <MenuItem onClick={() => scrollTo("about")}>Home</MenuItem>
          {/* <MenuItem onClick={() => scrollTo("roadmap")}>Features</MenuItem> */}
          {/* <MenuItem onClick={() => scrollTo("showcase")}>Showcase</MenuItem> */}
          {/* <MenuItem onClick={() => scrollTo("team")}>Team</MenuItem> */}
          <MenuItem onClick={() => scrollTo("faq")}>FAQ</MenuItem>
          <div className="mobile">
            <Button text="Download App" link="#" />
          </div>
          <div className="mobile">
            {/* <Button text="Download App" link="#" /> */}
            <Button text="Give Feedback ✨" link="https://7y983agopt4.typeform.com/to/hMC1rLuT" />
          </div>
        </Menu>
        <div className="desktop">
          {/* <Button text="Download App" link="#" /> */}
          <Button text="Give Feedback ✨" link="https://7y983agopt4.typeform.com/to/hMC1rLuT" />
        </div>
      </NavBar>
    </Section>
  );
};

export default Navigation;
