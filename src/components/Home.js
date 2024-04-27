import React from 'react'
// import CountUp from 'react-countup'
import { useNavigate } from 'react-router-dom'
import '../CSS/Home.css'


import logo3 from '../image/logo3.png';



const Home=()=> {
 
  const navigatelogin = useNavigate()
  return (
  <>
    <section className='Home-section'>
    
    <div className="Home">
        <div className='mainpage'><br/><br/><br/><br/>
            <img src={logo3} alt='logo' className="logo-2"/>
                <h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INFINITY-GAZE</h2><br/>
            <h1>That moment when you finish a game and <br/>just don't know what to do with your life anymore.</h1>
            <br/>
            <p>I don't always play games, but when I do, I prefer PC!!!</p>
                </div><br/><br/><div className='getbutton'>
            <button className='getstarted' onClick={() => navigatelogin("/SearchExplore")}><b>Get Started</b></button>
        </div>
    </div>
    </section>


    </>
  )
}


export default Home
