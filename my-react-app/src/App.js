import React from 'react';
import {Routes,Route} from 'react-router-dom'
// import './App.css'
import SearchExplore from './components/SearchExplore';
import Feedback from './components/Feedback';
import Home from './components/Home'

function App() {
  
  return (
      <div className='bg'>
      <Routes>  
        <Route path='/' element={<Home/>}></Route>
        <Route path='/SearchExplore' element={<SearchExplore/>}></Route>  
        <Route path='/Feedback' element={<Feedback/>}></Route>
      </Routes>

     
    </div>
  );
}
export default App;
