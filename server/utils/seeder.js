import dotenv from 'dotenv'
import connectDatabase from '../database/connectDatabase.js'
import Review from '../models/reviewModel.js'
import User from '../models/userModel.js'
import dummyUser from '../data/dummyUsers.json'assert { type: 'json' }
import dummyReview from '../data/dummyComments.json'assert { type: 'json' }



connectDatabase()


const seed = async () => {
     
    await User.deleteMany()
    console.log("user Deleted")


    await User.insertMany(dummyUser,{ordered:false})
    console.log("users inserted to database")
    process.exit()
}

seed()