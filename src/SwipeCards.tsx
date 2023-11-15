import React from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
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
            >
                {testData.map((character) =>
                    <SwiperSlide  key={character.name}>
                        <CardComponent {...character}/>
                    </SwiperSlide>
                )}
            </Swiper>
    )
}

export default Simple