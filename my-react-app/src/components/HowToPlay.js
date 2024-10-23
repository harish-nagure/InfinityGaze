import React, { useState } from 'react';
import { GiSplitCross } from "react-icons/gi";
import '../CSS/HowToPlay.css';

import Frist from './HowToPlayManual/main_1.png';
// import Last from './HowToPlayManual/last_1.png';

//Dinosaur Game
import DinosaurGame1 from './HowToPlayManual/Dinosaur Game/1.png';
import DinosaurGame2 from './HowToPlayManual/Dinosaur Game/2.png';

//Hill Climb
import HillClimb1 from './HowToPlayManual/Hill Climbing/1.png';
import HillClimb2 from './HowToPlayManual/Hill Climbing/2.png';

//Dr Stranger
import DrStranger1 from './HowToPlayManual/Dr Stranger/1.png';
// import DrStranger2 from './HowToPlayManual/Dr Stranger/2.png';

//Traffic Racer
// import TrafficRacer1 from './HowToPlayManual/Traffic Racer/1.png';
// import TrafficRacer2 from './HowToPlayManual/Traffic Racer/2.png';

//Moto 

//


const HowToPlay = ({ type, onClose }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // eslint-disable-next-line
    let manualImages=[];
    console.log(type);
    switch(type) {
        case 'Dragon':
            manualImages = [Frist, DinosaurGame1, DinosaurGame2];
            break;
        case 'Dr Strange Mudras':
            manualImages = [Frist, DrStranger1];
            break;
        case 'Hill Climb':
            manualImages = [Frist, HillClimb1, HillClimb2];
            break;
        case 'Traffic Racer':
            manualImages = [Frist, ];
            break;
        case 'Moto X3':
            manualImages = [Frist, ];
            break;
        case 'Subway Surfer':
            manualImages = [Frist, ];
            break;
        case 'Retro Highway':
            manualImages = [Frist, ];
            break;
        default:
            manualImages = [];
            break;
    }

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => {
        //console.log((prevIndex + 1)%manualImages.length );
        return (prevIndex + 1) % manualImages.length;
    });   
};

  return (
    <>
    <div className="how-to-play-modal">
    <img src={manualImages[currentImageIndex]} alt='img'/>
    <div className='how-to-play-cancel-btn'>
    <button className="cancel-btn" onClick={onClose}>
        <GiSplitCross />
    </button>
    </div>
        <div className="how-to-play-modal-content">
        <button className='next-btn' onClick={handleNext}> 
            Next
        </button>
        </div>
    </div>
    </>
  );
};

export default HowToPlay;
