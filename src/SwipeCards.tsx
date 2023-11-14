import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import CardComponent from './CardComponent'; // Убедитесь, что этот компонент импортирован
import { testData } from './testData'; // Данные для карточек

const SwipeCards: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const childRefs = useMemo(() =>
            Array(testData.length).fill(0).map(() => React.createRef<never>())
        , []);

    const swiped = (direction: string, index: number) => {
        console.log(`You swiped ${direction} on card number ${index + 1}`);
        setCurrentIndex(currentIndex => (currentIndex + 1) % testData.length); // Бесконечный цикл карточек
    };

    const outOfFrame = (name: string) => {
        console.log(`${name} left the screen!, ${currentIndex}`);
    };

    return (
        <div>
            {testData.map((person, index) => (
                <TinderCard
                    ref={childRefs[index]}
                    key={person.name}
                    onSwipe={(dir) => swiped(dir, index)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                    preventSwipe={['up', 'down']}
                >
                    <CardComponent
                        imageUrl={person.imageUrl}
                        name={person.name}
                        age={person.age}
                        hobby={person.hobby}
                    />
                </TinderCard>
            ))}
        </div>
    );
};

export default SwipeCards;
