import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import CardComponent from './CardComponent'; // Убедитесь, что этот компонент импортирован
import { testData } from './testData'; // Данные для карточек

const to = (i:number) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r:number, s:number) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const SwypeCards:React.FC = () => {
    const [gone] = useState(() => new Set());
    const [props, set] = useSprings(testData.length, i => ({ ...to(i), from: from() }));

    const bind = useGesture({
        onDrag: ({ args: [index], down, movement: [xDelta], velocity }) => {
            const trigger = velocity > 0.2;
            const dir = xDelta < 0 ? -1 : 1;
            if (!down && trigger) gone.add(index);
            set(i => {
                if (index !== i) return;
                const isGone = gone.has(index);
                const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
                const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
                const scale = down ? 1.1 : 1;
                return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } };
            });
            if (!down && gone.size === testData.length) setTimeout(() => {gone.clear(); set(i => to(i))}, 600);
        }
    });

    return props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans) }}>
                <CardComponent
                    imageUrl={testData[i].imageUrl}
                    name={testData[i].name}
                    age={testData[i].age}
                    hobby={testData[i].hobby}
                />
            </animated.div>
        </animated.div>
    ));
}
export default SwypeCards;