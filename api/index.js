import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user.routes.js'
import authRouter from './routes/authentication.routes.js'


dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(
    process.env.MONGO
).then(()=>{
    console.log("Mongodb is connected")
}).catch((error)=>{
    console.log('Error connecting mongodb' , error)
})

const port = 5000
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})


app.use( '/user' , router )
app.use( '/api/auth' , authRouter )