import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import CardComponent from './CardComponent'; // Импорт компонента карточки
import { testData } from './testData'; // Импорт данных из testData.ts

interface SpringProps {
    x: number;
    scale: number;
    opacity: number;
}
const SwipeCards: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [springProps, setSpringProps] = useSpring<SpringProps>(() => ({
        x: 0,
        scale: 1,
        config: { tension: 300, friction: 30 },
        immediate: false
    }));

    const handleStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const clientX = event.type.includes('mouse') ? (event as React.MouseEvent).clientX : (event as React.TouchEvent).touches[0].clientX;
        setStartX(clientX);
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const clientX = event.type.includes('mouse') ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
        const deltaX = clientX - startX;
        setSpringProps({ x: deltaX, immediate: true });
    };

    const handleEnd = () => {
        setIsDragging(false);
        const deltaX = springProps.x.get();
        if (Math.abs(deltaX) > window.innerWidth / 4) {
            const direction = deltaX < 0 ? 'left' : 'right';
            setSpringProps({
                x: direction === 'left' ? -window.innerWidth : window.innerWidth,
                scale: 0.5,
                opacity: 0,
                onRest: () => {
                    setIndex((i) => (i + 1) % testData.length);
                    setSpringProps({ x: 0, scale: 1, opacity: 1, immediate: false });
                },
            });
        } else {
            setSpringProps({ x: 0, scale: 1, opacity: 1, immediate: false });
        }
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [handleMove, handleEnd]);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vw' }}>
            {testData.map((item, i) => (
                <animated.div
                    key={i}
                    style={{
                        ...springProps,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: i === index || i === index + 1 ? 'block' : 'none'
                    }}
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                >
                    <CardComponent
                        imageUrl={item.imageUrl}
                        name={item.name}
                        age={item.age}
                        hobby={item.hobby}
                    />
                </animated.div>
            ))}
        </div>
    );
};

export default SwipeCards;
