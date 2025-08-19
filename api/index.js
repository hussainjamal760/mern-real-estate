import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import authRouter from './routes/authRoutes.js'
const PORT = 3000;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO).then(()=>{console.log("Mongo connected")
}).catch((err)=>console.log(err))

app.use('/api/auth' , authRouter)

app.use((err , req , res , next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

app.listen(PORT , ()=>{
    console.log("Working at port 3000");
})