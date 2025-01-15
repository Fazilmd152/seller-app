import catchAsyncError from "../middlewares/catchAsyncError.js"
import User from "../models/userModel.js"
import Seller from "../models/sellerModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import sendCookie from "../utils/sendCookie.js"
import Features from "../utils/Features.js"

//signup route -- (http://localhost:7070/api/auth/signup)
export const signUp = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body
    let user = await User.create(req.body)

    //creating a seller account if not exist
    //if account exists, it returns the seller account
    const seller = await new Features(Seller).isSeller(user)
    //sending cookies
    sendCookie(res, 200, { user, seller, message: "account created succesfully" })
})


// Signin route -- (http://localhost:7070/api/auth/signin)
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //validating the body to ensure it has a vlue
    const isValid = await new Features().validateBody(req.body)

    if (isValid) {
        //checking if it is valid user
        const user = await new Features(User).validateUser({ email })

        if (!user)
            return next(new ErrorHandler("Invalid email or password", 401))

        //validating password
        if (!await user.isValidPassword(password))
            return next(new ErrorHandler("Invalid email or password", 401))

        //checking weather it's a seller account or not for dynamic response
        const seller = await new Features(Seller).isSeller(user)
        sendCookie(res, 200, { user, seller, message: "signed in succesfully" })
    }
})

// update account route -- (http://localhost:7070/api/auth/update)
export const updateAccount = catchAsyncError(async (req, res, next) => {
    const { user } = req   //destructuring user in a req object
    const { email, name } = req.body

    if (!email && !name)
        return next(new ErrorHandler("Enter details to update", 400))

    //Assigning a new value to the user object 
    user.name = name ?? user.name
    user.email = email ?? user.email

    //saving the object in database
    const updatedUser = await user.save({ new: true, validateBeforeSave: true })

    if (!updatedUser) //sending error response,if updates failed
        return next(new ErrorHandler("Account update failed", 401))

    res.status(200).json({
        success: true,
        updatedUser
    })
})


//change password route --  put (http://localhost:7070/api/auth/changepassword)
export const changePassword = catchAsyncError(async (req, res, next) => {
    const { password, newPassword } = req.body
    const user = await User.findById(req.user._id).select("+password")

    //validating password
    if (!await user.isValidPassword(password))
        return next(new ErrorHandler("Incorrect password", 400))

    //udating new password
    user.password=newPassword
    await user.save({validateBeforeSave:true})

    res.status(200).json({
        succes:true,
        meassage:"Password has been changed succesfully"
    })
})


//signOut route
export const signOut = catchAsyncError(async (req, res, next) => {
    res.cookie('sellerCookie', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200)
        .json({
            success: true,
            message: "sign out succesfully"
        })
})

export const getMe = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})