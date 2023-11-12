import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface SwipeCardsProps {
    showTapZones: boolean;
}

const colors = ["red", "blue", "green", "yellow"];

const SwipeCards: React.FC<SwipeCardsProps> = ({ showTapZones }) => {
    const [index, setIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [springProps, setSpringProps] = useSpring(() => ({
        x: 0,
        scale: 1,
        opacity: 1,
        config: { tension: 300, friction: 30 },
        immediate: false
    }));

    const handleStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (showTapZones) return;
        setIsDragging(true);
        const clientX = event.type.includes('mouse') ? (event as React.MouseEvent).clientX : (event as React.TouchEvent).touches[0].clientX;
        setStartX(clientX);
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging || showTapZones) return;
        const clientX = event.type.includes('mouse') ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
        setSpringProps({ x: clientX - startX, immediate: true });
    };

    const handleEnd = () => {
        if (showTapZones) return;
        setIsDragging(false);
        const deltaX = springProps.x.get();
        if (Math.abs(deltaX) > window.innerWidth / 4) {
            const direction = deltaX < 0 ? 'left' : 'right';
            setSpringProps({
                x: direction === 'left' ? -window.innerWidth : window.innerWidth,
                scale: 0.5,
                opacity: 0,
                onRest: () => {
                    setIndex((i) => (i + 1) % colors.length);
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

    const tapZoneStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '12.5%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        display: showTapZones ? 'block' : 'none'
    };

    return (
        <animated.div
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            style={{
                position: 'relative',
                ...springProps,
                width: '100vw',
                height: '100vw',
                backgroundColor: colors[index],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                touchAction: 'none',
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            {showTapZones && <div style={{ ...tapZoneStyle,position: 'absolute', left: 0 }} onClick={() => setSpringProps({ x: -window.innerWidth, scale: 0.5, opacity: 0 })} />}
            {showTapZones && <div style={{ ...tapZoneStyle,position: 'absolute', right: 0 }} onClick={() => setSpringProps({ x: window.innerWidth, scale: 0.5, opacity: 0 })} />}
            Swipe or Tap me!
        </animated.div>
    );
};

export default SwipeCards;
