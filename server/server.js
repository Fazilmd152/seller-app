import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './database/connectDatabase.js'
import userRoutes from './routes/userRoute.js'
import sellerRoutes from './routes/sellerRoute.js'
import reviewRoutes from './routes/reviewRoute.js'
import error from './middlewares/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

const __dirname = path.resolve()
const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:3000",credentials:true}))
//app.use(express.urlencoded({ extended: true }))


app.use("/api/auth/", userRoutes) //user routes 
app.use("/api/seller/", sellerRoutes) //seller routes 
app.use("/api/review/", reviewRoutes) //review routes 




app.use(error) //this middleware caught and send custom errors


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.use('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} `);
    connectDatabase()
})