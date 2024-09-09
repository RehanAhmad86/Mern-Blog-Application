import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/user.routes.js'



dotenv.config()
const app = express()

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