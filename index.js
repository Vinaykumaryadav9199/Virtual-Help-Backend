const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const dbConnection = require('./Database/dbConnection')
const cors = require("cors")
const NotesRouter = require("./Routes/Notes")
const AllData = require("./Routes/AllData")
const authRouter = require('./Routes/auth')
const blogrouter = require('./Routes/Blogs')
const pyqsRouter = require('./Routes/pyq')
const BlogsPage = require('./Routes/BlogsPage')
app.use(cookieParser());

app.use(express.json({limit:'100mb'}));
app.use(cors({
    origin: ['https://virtualhelp.vercel.app'],
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
