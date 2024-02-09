const mongoose = require('mongoose');
const mongooseUrl = "mongodb+srv://virtualhelp62:Virtual123@cluster0.xgumyjg.mongodb.net/?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
   // useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(mongooseUrl,connectionParams).then(()=>{
    console.log("connected to Database");
}).catch((err)=>{
    console.error(err);
})