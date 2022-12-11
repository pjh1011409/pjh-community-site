import * as React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

export default function ImageSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const petImage = ['/images/Cat1.jpg', '/images/Dog2.jpg', '/images/Cat2.jpg'];
  return (
    <Slider {...settings}>
      {petImage.map(img => {
        return (
          <div key={img}>
            <Image
              src={`${img}`}
              alt="동물사진"
              width={400}
              height={400}
              className="mx-auto rounded-xl w-full"
            />
          </div>
        );
      })}
    </Slider>
  );
}
