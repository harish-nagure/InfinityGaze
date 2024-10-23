 express = require('express') // use to create server

const router = express.Router(); // requiring router to navigate the data from frontened to database

const nodemailer = require('nodemailer') // use to emails

require('../db/connection'); // requiring database connection file so that we can store our data

const User = require("../model/userSchema"); //requiring skeleton structure of our registeration


const transporter2 = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: 'infinitygaze.2024@gmail.com',
        pass: 'wbccetxfcsvbtbgp'
    }

})

// feedback page routing
router.post('/feedback1', async (req, res) => {

    console.log(req.body); // requiring data from frontened

    const { name, email, feedback } = req.body //Initializing frontened data to our userSchema

    // Validiating frontended data in our server 
    if (!name || !email || !feedback) {
        return res.json({ status: 422, error: "plz filled the field" })
    }

    try {
            const user = new User({ name, email, feedback })
            await user.save();

                //Defining the admin through which mails are send
                const mailOptions = {
                    from: 'infinitygaze.2024@gmail.com',

                    to: email,

                    subject: "🎮 Let's Keep the Fun Going! Your Feedback Matters!",

                    html: `
                    <b><p style="color: #666; font-family: Arial, sans-serif;">
                    Dear ${name},<br/>
                    
                    Greetings from Infinity Gaze team!<br/>
                    
                    We wanted to drop you a quick note to say a massive thank you for sharing your feedback with us.
                    🙌 We're thrilled to hear that you're having a blast with our app! 🚀 Your input means the world to 
                    us, and it's what keeps us motivated to continue delivering the best gaming experience possible.<br/><br/>
                    
                    Your feedback has put a big smile on our faces 😊 and has inspired us to keep the fun going! 
                    We're all about creating epic gaming moments, and knowing that you're enjoying our app makes our day.<br/><br/>
                    
                    So, let's keep the adventure going, shall we? 🎉 Whether you're conquering new levels, 
                    challenging your friends, or discovering exciting features, we're here to make sure every moment 
                    is filled with excitement and joy.<br/><br/>
                    
                    Thank you for being an awesome part of our gaming community! We're here to make sure you 
                    have a blast every step of the way.<br/><br/>
                    
                    Game on and have a fantastic time exploring everything Infinity Gaze has to offer!<br/><br/><br/>
                    
                    Best Regards,<br/>
                    Infinity Gaze Team<br/>
                    </p>
                    </b>`
                }

                // sending email with the help of senMail method
                transporter2.sendMail(mailOptions, (error) => {

                    //if there is error in mailoptions method than we thro a error
                    if (error) {
                        console.log("error", error);
                        res.status(401).json({ status: 401, message: "Email not sent" })
                    }
                    else {
                        console.log("Email Sent Successfully");
                        res.status(201).json({ status: 201, message: "Email sent Successfully" })
                    }
                })


            res.json({ status: 201, message: "User feedback sent successfully" })
        }

    catch (err) {
        console.log(err);
    }

});

module.exports = router;