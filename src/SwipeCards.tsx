import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const colors = ["red", "blue", "green", "yellow"]; // Пример цветов для квадратиков

const SwipeCards:React.FC = () => {
    const [index, setIndex] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            alert('Dislike');
            setIndex((i) => (i + 1) % colors.length);
        },
        onSwipedRight: () => {
            alert('Like');
            setIndex((i) => (i + 1) % colors.length);
        }
    });

    return (
        <div {...handlers} style={{
            width: '100vw',
            height: '100vw', // Задает высоту равной ширине для сохранения квадратной формы
            backgroundColor: colors[index],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            Swipe me!
        </div>
    );
};

export default SwipeCards;
