import React, { useState} from 'react';
import { testData } from './testData';
import TinderCard from 'react-tinder-card';
import CardComponent from './CardComponent';
import  './styles.css'
// Import Swiper React components




const Simple:React.FC =  () => {
   
    const [lastDirection, setLastDirection] = useState<string | undefined>()
  
    const swiped = (direction:string | undefined) => {
    //   console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name:string) => {
      console.log(name + ' left the screen!')
    }
  
    return (
      <div>
        <div className='cardContainer'>
          {testData.map((character) =>
            <TinderCard swipeRequirementType={'position'} swipeThreshold={200} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir)} onCardLeftScreen={() => outOfFrame(character.name)}>
              <CardComponent {...character}/>
            </TinderCard>
          )}
        </div>
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      </div>
    )
  }
  
  export default Simple