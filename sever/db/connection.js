 const mongoose= require('mongoose')
const DB = "mongodb+srv://nagureharish:Harish@cluster0.ywzlvt1.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0;"
mongoose.set('strictQuery',true);
mongoose.connect(DB).then(()=>{
  console.log('Connection Successful');
}).catch((err)=>console.log(`Connection Unsuccessful ${err}`));