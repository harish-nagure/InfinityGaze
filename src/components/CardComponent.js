import React, { useState } from "react";
import { fetchDataDragon, fetchDataDR,fetchDataHillClimb,fetchDataTrafficRacer } from './fetchData';
import '../CSS/CardComponent.css'



const CardComponent = ({ item }) => {
  
  // eslint-disable-next-line
  const [data, setData] = useState('');
  // eslint-disable-next-line
  const [error, setError] = useState('');
  
  const handleFetchData = () => {
    if (item.name === 'Dragon') {
      fetchDataDragon(setData, setError);
    } else if (item.name === 'Dr Strange Mudras') {
      fetchDataDR(setData, setError);
    } else if (item.name === 'Hill Climb') {
      fetchDataHillClimb(setData, setError);
    } else if (item.name === 'Traffic Racer') {
      fetchDataTrafficRacer(setData, setError);
    } 
  };

  return (
    <>
    <div className="card">
      <div className="explore-bg">
        <div className="explore-col-1">

          <img src={item.logo} alt="logo" />

          <div className="line"></div>
          <div className="buttons">
          <button onClick={handleFetchData} className="play-button">
            {item.name}</button>
            
          <button onClick={item.connect} className="button-connect">
            How to play</button>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CardComponent;
