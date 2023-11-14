import React, { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import CardComponent from './CardComponent'; // Убедитесь, что этот компонент импортирован
import { testData } from './testData'; // Данные для карточек

// interface CardData {
//     imageUrl: string;
//     name: string;
//     age: number;
//     hobby: string;
// }

const to = (i: number) => ({ x: 0, y: 0, scale: 1, rot: 0, delay: i * 100 });
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (_r: number, s: number) => `perspective(1500px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${s})`;

const SwipeCards:React.FC = ()=> {
    const [gone] = useState(() => new Set<number>());
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
            if (!down && gone.size === testData.length) setTimeout(() => {gone.clear() ; set(i => to(i))}, 600);
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return props.map(({ x, y,rot, scale }, i) => (
        <animated.div key={`${i}${rot}`} style={{ transform: x.to(x => `translate3d(${x}px,${y}px,0)`) }}>
            <animated.div {...bind(i)} style={{ transform: scale.to(trans) }}>
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

export default SwipeCards;
