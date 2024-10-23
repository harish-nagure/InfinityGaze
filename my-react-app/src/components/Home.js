import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSS/Home.css'


import logo3 from '../image/logo3.png';
import Feedback from './Feedback';

const Home=()=> {
 
  const navigate = useNavigate()

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleOpenFeedback = () => {
    setIsFeedbackOpen(true);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackOpen(false);
  };



  return (
  <>
    <section className='Home-section'>
    
    <div className="Home">
        <div className='mainpage'><br/><br/><br/><br/>
            <img src={logo3} alt='logo' className="logo-2"/>
                <h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INFINITY-GAZE</h2><br/>
            <h1>Enter the realm of InfinityGaze <br/>where every game unlocks a universe of endless possibilities. </h1>
            <br/>
            <p>Where gaming transcends reality, <span className='break-word'/> and every click unlocks a new adventure!</p>
                </div><br/><br/><div className='getbutton'>
            <button className='getstarted' onClick={() => navigate("/SearchExplore")}><b>Explore Games</b></button></div>
            <div className='feed-btn'>
            <button className='feedback-btn' onClick={handleOpenFeedback}><b>Feedback</b></button>
            </div>

        
    </div>
    </section>

     {isFeedbackOpen && <Feedback onClose={handleCloseFeedback} /> }
          
    
    </>
  )
}


export default Home
