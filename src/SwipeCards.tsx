import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface SwipeCardsProps {
    showTapZones: boolean;
}

const colors = ["red", "blue", "green", "yellow"];

const SwipeCards: React.FC<SwipeCardsProps> = ({ showTapZones }) => {
    const [index, setIndex] = useState(0);
    const [props, set] = useSpring(() => ({
        opacity: 1,
        transform: 'translateX(0px)'
    }));

    const handleSwipe = (direction: 'left' | 'right') => {
        set({
            opacity: 0,
            transform: `translateX(${direction === 'left' ? -100 : 100}%)`
        });

        setTimeout(() => {
            set({ opacity: 1, transform: 'translateX(0px)' });
            setIndex((i) => (i + 1) % colors.length);
        }, 500);
    };

    const tapZoneStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '12.5%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'block'
    };

    return (
        <animated.div
            style={{
                position: 'relative',
                ...props,
                width: '100vw',
                height: '100vw',
                backgroundColor: colors[index],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {showTapZones && <div style={{ ...tapZoneStyle,position:'absolute', left: 0 }} onClick={() => handleSwipe('left')} /> }
            {showTapZones && <div style={{ ...tapZoneStyle,position:'absolute', right: 0 }} onClick={() => handleSwipe('right')} />}
            Swipe or Tap me!
        </animated.div>
    );
};

export default SwipeCards;
