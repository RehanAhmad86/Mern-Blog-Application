import express  from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user.routes.js'
import authRouter from './routes/authentication.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import postRouter from './routes/post.route.js'
import commmentRouter from './routes/comment.route.js'


dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true // Allow credentials (cookies) to be sent
  }));
app.use(cookieParser())

mongoose.connect(
    process.env.MONGO
).then(()=>{
    console.log("Mongodb is connected")
}).catch((error)=>{
    console.log('Error connecting mongodb' , error)
})

//const port = 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})


app.use( '/user' , router )
app.use( '/post' , postRouter )
app.use( '/api/auth' , authRouter )
app.use( '/comment' , commmentRouter )



app.use( ( error , request , response , next ) => {
    const statusCode = error.statusCode || 500
    const message = error.message || 'Internal server error'
    response.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})