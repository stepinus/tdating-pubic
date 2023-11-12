import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';

interface SwipeCardsProps {
    showTapZones: boolean;
}

const colors = ["red", "blue", "green", "yellow"];

const SwipeCards: React.FC<SwipeCardsProps> = ({ showTapZones }) => {
    const [index, setIndex] = useState(0);
    const [springProps, setSpringProps] = useSpring(() => ({
        from: { transform: 'scale(1)', opacity: 1 },
        to: { transform: 'scale(1)', opacity: 1 },
        reset: true
    }));

    const swipe = (direction: 'left' | 'right') => {
        setSpringProps({
            to: {
                transform: `translateX(${direction === 'left' ? '-150%' : '150%'}) scale(0.5)`,
                opacity: 0
            },
            onRest: () => {
                setIndex((i) => (i + 1) % colors.length);
                setSpringProps({ from: { transform: 'scale(1)', opacity: 1 } });
            },
        });
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => swipe('left'),
        onSwipedRight: () => swipe('right')
    });

    const tapZoneStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '12.5%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)'
    };

    return (
        <animated.div
            {...swipeHandlers}
            style={{ ...springProps,
                position: 'relative',
                width: '100vw',
                height: '100vw',
                backgroundColor: colors[index],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {showTapZones && <div style={{ ...tapZoneStyle,   position: 'absolute', left: 0 }} onClick={() => swipe('left')} />}
            {showTapZones && <div style={{ ...tapZoneStyle,   position: 'absolute', right: 0 }} onClick={() => swipe('right')} />}
            Swipe or Tap me!
        </animated.div>
    );
};

export default SwipeCards;
