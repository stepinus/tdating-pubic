import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import CardComponent from './CardComponent';
import { testData } from './testData';

const MAX_VISIBLE_CARDS = 3;

const SwipeCards: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [springProps, setSpringProps] = useSpring(() => ({
        x: 0,
        config: { tension: 300, friction: 30 }
    }));

    const handleStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const clientX = event.type.includes('mouse') ? (event as React.MouseEvent).clientX : (event as React.TouchEvent).touches[0].clientX;
        setSpringProps.start({ x: clientX });
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
        const clientX = event.type.includes('mouse') ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
        setSpringProps.start({ x: clientX });
    };

    const handleEnd = () => {
        const swipeThreshold = window.innerWidth / 4;
        if (Math.abs(springProps.x.get()) > swipeThreshold) {
            setIndex(i => (i + 1) % testData.length);
        }
        setSpringProps.start({ x: 0 });
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
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vw' }}>
            {testData.slice(index, index + MAX_VISIBLE_CARDS).map((item, i) => (
                <animated.div
                    key={i}
                    style={{
                        ...springProps,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        willChange: 'transform',
                        touchAction: 'none',
                        cursor: 'grab'
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
