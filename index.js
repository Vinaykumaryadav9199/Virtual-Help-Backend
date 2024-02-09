const express = require('express');
const app = express();

const dbConnection = require('./Database/dbConnection')
const cors = require("cors")

const NotesRouter = require("./Routes/Notes")
const AllData = require("./Routes/AllData")
const authRouter = require('./Routes/auth')
const blogrouter = require('./Routes/Blogs')
const pyqsRouter = require('./Routes/pyq')
app.use(express.json({limit:'100mb'}));


const BlogsPage = require('./Routes/BlogsPage')


app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    sameSite: 'none'
}));
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' ,sameSite: 'lax' }));
app.use("/" ,NotesRouter)
app.use("/" ,authRouter)
app.use("/",blogrouter)
app.use("/" ,AllData )
app.use("/",pyqsRouter)
app.use("/" ,BlogsPage )
// app.use("/" ,CheckLogin)





app.listen(8000 ,()=>{
    console.log("Server Set");
})