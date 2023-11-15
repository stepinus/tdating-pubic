import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

export default () => {
    // Create array with 1000 slides
    const slides = Array.from({ length: 1000 }).map(
        (_el, index) => `Slide ${index + 1}`
    );

    return (
        <Swiper modules={[Virtual,EffectCards]}   effect={'cards'}
                grabCursor={true} spaceBetween={50} slidesPerView={3} virtual>
            {slides.map((slideContent, index) => (
                <SwiperSlide key={slideContent} virtualIndex={index}>
                    {slideContent}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};