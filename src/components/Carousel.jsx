import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bgImg1 from "../assets/images/carousel1.jpg";
import bgImg2 from "../assets/images/carousel2.jpg";
import bgImg3 from "../assets/images/carousel3.jpg";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Slide from "./Slide";

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Slide
          img={bgImg1}
          title={"Get your web development project done"}
        ></Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          img={bgImg2}
          title={"Get your graphics design project done"}
        ></Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          img={bgImg3}
          title={"Get your digital marketing project done"}
        ></Slide>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
