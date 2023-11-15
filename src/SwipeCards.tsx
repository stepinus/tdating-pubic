import React from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/virtual';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardComponent from "./CardComponent.tsx";
import {testData} from "./testData.ts";

const Simple:React.FC =()=> {
    return (
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                style={{width:'100vw'}}
                slidesPerView={2}
                virtual
            >
                {testData.map((character) =>
                    <SwiperSlide  key={character.name}>
                        <div style={{width:'100vw'}}><CardComponent {...character} /></div>
                    </SwiperSlide>
                )}
            </Swiper>
    )
}

export default Simple