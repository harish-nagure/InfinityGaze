
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        require:true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now 
    }
})


const  User = mongoose.model('user_feedback',userSchema);
module.exports = User;