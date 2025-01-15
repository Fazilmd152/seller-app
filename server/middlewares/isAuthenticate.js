import jwt from 'jsonwebtoken'
import ErrorHandler from '../utils/ErrorHandler.js'
import User from '../models/userModel.js'


//checks weather they already signedin or not
export default async function isAuthenticate(req, res, next) {
    //destructuring the cookie,renamed as token
    const { sellerCookie: token } = req.cookies

    if (!token)
        return next(new ErrorHandler("Login first to handle this resource", 401))

    //verifies wether it's a valid cookie 
    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(id)
    if (!user)
        return next(new ErrorHandler("user not found", 401))

    req.user = user  //adding user object in req object
    next()
} 