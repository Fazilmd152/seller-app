import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export default function connectDatabase() {
    mongoose.connect(process.env.DB_LOCAL_URI || "mongodb://localhost:27017/seller_management")
        .then(d => {
            console.log("Database connected succesfully");
        })
        .catch(e => {
            console.log(`Database failed to connect : ${e.message}`);
        })
}
