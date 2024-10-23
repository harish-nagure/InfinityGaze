import React, { useState } from 'react';
import '../CSS/Feedback.css'

import { GiSplitCross } from "react-icons/gi";



const Feedback = ({ onClose }) => {

    const [inpval, setInpval] = useState({
        name: "", email: "", feedback: ""
    });

    const setVal = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, feedback } = inpval;
        if (name === "") {
            alert("Name is required!");
        } else if (email === "") {
            alert("Email is required with @ Symbol!");
        } else if (!email.includes("@")) {
            alert("Includes @ in your Email!");
        } else if (feedback === "") {
            alert("Feedback is required!");
        } else {
            const data = await fetch("/feedback1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, feedback
                })
            });
            const res = await data.json();
            if (res.status === 201) {
                alert("Feedback send Successfully!");
                alert("Please check your mail");
                setInpval({ ...inpval, name: "", email: "", feedback: "" });
                
            } else {
                alert("Error!!!");
            }
        }
    };

    return (
        <>
                <div className="Feedback">
                <button className="cancel-btn" onClick={onClose}>
                <GiSplitCross />
                </button>
                        <form method='post'>
                            <div className='form_input'>
                                <label htmlFor='name'>Name:</label>
                                <input type="text" autoComplete='off' onChange={setVal} value={inpval.name} name="name" id="name" placeholder='Please enter your name' />
                            </div>
                            <div className='form_input'>
                                <label htmlFor='email'>Email:</label>
                                <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Please enter your email address' />
                            </div>
                            <div className='form_input'>
                                <label htmlFor='Feedback'>Feedback:</label>
                                <input type="text" onChange={setVal} value={inpval.feedback} name="feedback" id="feedback" placeholder='Please enter your feedback' />
                            </div>
                            <input type='submit' className='btn' id='submit' name='Submit' value='Submit' onClick={PostData} />
                        </form>
                    
                </div>
            
        </>
    )
};

export default Feedback;
