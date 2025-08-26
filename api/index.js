import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import listingRouter from './routes/listingRoutes.js'
import cookieParser from 'cookie-parser'
import path from 'path';

  const __dirname = path.resolve();

const PORT = 3000;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO).then(()=>{console.log("Mongo connected")
}).catch((err)=>console.log(err))

app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)
app.use('/api/listing' , listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});


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