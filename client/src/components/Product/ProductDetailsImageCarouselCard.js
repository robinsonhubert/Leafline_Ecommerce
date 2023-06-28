import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReactImageMagnify from 'react-image-magnify';


const ProductDetailsImageCarouselCard = ({images}) => {
  const pagination={
    clickable:true,
    renderbullet:function(index,className){
      return '<span class="'+className+'">'+(index+1)+"</span>";
    }
  }
  return (
    <Swiper
    cssMode={true}
    navigation={true}
    pagination={pagination}
    mousewheel={true}
    keyboard={true}
    autoplay={{delay:2500,disableOnInteraction:true}}
    loop={true}
    modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
    className="mySwiper"
    > 
      {images.map((image,index)=>(
        <SwiperSlide key={index}>
          <ReactImageMagnify {...{
              smallImage: {
                  alt: 'Eco friendly plates',
                  isFluidWidth: true,
                  src: image.url
              },
              largeImage: {
                  src: image.url,
                  width: 1000,
                  height: 1000
              },
              enlargedImagePosition:'over'
          }} />
        </SwiperSlide>
      ))}
      
    </Swiper>
  )
}

export default ProductDetailsImageCarouselCard