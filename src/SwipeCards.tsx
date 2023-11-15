import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import {testData} from "./testData.ts";
import CardComponent from "./CardComponent.tsx";

export default () => {
    // Create array with 1000 slides


    return (
        <div style={{width:'100vw', height:'500px'}}>
        <Swiper modules={[Virtual,EffectCards]}   effect={'cards'}
                grabCursor={true}  slidesPerView={3} virtual>
            {testData.map((slideContent, index) => (
                <SwiperSlide key={slideContent.name} virtualIndex={index}>
                  <CardComponent {...slideContent}/>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
};