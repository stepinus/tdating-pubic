import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import CardComponent from './CardComponent';
import { testData } from './testData';

const SwipeCards: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [springProps, setSpringProps] = useSpring(() => ({
        x: 0,
        opacity: 1,
        config: { tension: 300, friction: 30 },
        immediate: key => key === "x"
    }));

    const handleStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const clientX = event.type.includes('mouse') ? (event as React.MouseEvent).clientX : (event as React.TouchEvent).touches[0].clientX;
        setStartX(clientX);
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const clientX = event.type.includes('mouse') ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
        setSpringProps.start({ x: clientX - startX });
    };

    const handleEnd = () => {
        setIsDragging(false);
        const swipeThreshold = window.innerWidth / 4;
        const deltaX = springProps.x.get();
        if (Math.abs(deltaX) > swipeThreshold) {
            setSpringProps.start({
                x: deltaX < 0 ? -window.innerWidth : window.innerWidth,
                opacity: 0,
                onRest: () => {
                    setIndex(i => (i + 1) % testData.length);
                    setSpringProps.start({ x: 0, opacity: 1 });
                },
            });
        } else {
            setSpringProps.start({ x: 0 });
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
            {[testData[index], testData[(index + 1) % testData.length]].map((item, i) => (
                <animated.div
                    key={i}
                    style={{
                        ...springProps,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: i === 0 ? 'block' : 'none'
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
