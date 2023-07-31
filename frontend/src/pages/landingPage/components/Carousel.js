import React from "react";
import styled from "styled-components";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay, EffectCards } from "swiper";

import img1 from "../assets/Mockuos/mockup1.png";
import img2 from "../assets/Mockuos/mockup2.png";
import img3 from "../assets/Mockuos/mockup3.png";
import img4 from "../assets/Mockuos/mockup4.png";
import img5 from "../assets/Mockuos/mockup5.png";
import img6 from "../assets/Mockuos/mockup6.png";
import img7 from "../assets/Mockuos/mockup7.png";
import img8 from "../assets/Mockuos/mockup8.png";
import img9 from "../assets/Mockuos/mockup9.png";

// import img10 from "../assets/Nfts/bighead-9.svg";
// import img11 from "../assets/Nfts/bighead-10.svg";

const Container = styled.div`
  width: 25vw;
  height: 70vh;

  @media (max-width: 70em) {
    height: 60vh;
  }

  @media (max-width: 64em) {
    height: 50vh;
    width: 30vw;
  }

  @media (max-width: 48em) {
    height: 50vh;
    width: 40vw;
  }

  @media (max-width: 30em) {
    height: 45vh;
    width: 60vw;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    background-color: ${(props) => props.theme.carouselColor};
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .swiper-button-next {
    color: ${(props) => props.theme.text};

    @media (max-width: 64em) {
      font-size: 3rem;
    }
    @media (max-width: 30em) {
      font-size: 2rem;
    }
  }
  .swiper-button-prev {
    color: ${(props) => props.theme.text};

    @media (max-width: 64em) {
      font-size: 3rem;
    }
    @media (max-width: 30em) {
      font-size: 2rem;
    }
  }
`;

const Carousel = () => {
  return (
    <Container>
      <Swiper
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ type: "fraction" }}
        scrollbar={{ draggable: true }}
        navigation={true}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img7} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img8} alt="The Weirdos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img9} alt="The Weirdos" />
        </SwiperSlide>
    
      </Swiper>
    </Container>
  );
};

export default Carousel;
