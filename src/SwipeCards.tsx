import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const colors = ["red", "blue", "green", "yellow"]; // Пример цветов для квадратиков

const SwipeCards:React.FC = () => {
    const [index, setIndex] = useState(0);
    const [swipeStyle, setSwipeStyle] = useState({});

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            const {dir} = eventData;
            if (dir === 'Left' || dir === 'Right') {
                setSwipeStyle({
                    opacity: 0,
                    transform: `translateX(${dir === 'Left' ? '-100%' : '100%'})`
                });
                setTimeout(() => {
                    setSwipeStyle({});
                    setIndex((i) => (i + 1) % colors.length);
                }, 500); // Сбросить стиль через 500 мс
            }
        }
    });

    return (
        <div {...handlers} style={{
            width: '100vw',
            height: '100vw',
            backgroundColor: colors[index],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.5s, opacity 0.5s',
            ...swipeStyle
        }}>
            Swipe me!
        </div>
    );
}
export default SwipeCards;