import catchAsyncError from "../middlewares/catchAsyncError.js"
import Seller from "../models/sellerModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import sendCookie from "../utils/sendCookie.js"
import Features from "../utils/Features.js"

//signup route -- (http://localhost:7070/api/auth/signup)
export const signUp = catchAsyncError(async (req, res, next) => {

    const { multipleUser } = req.body
    if (process.env.NODE_ENV === 'development' && req.body.multipleUser) {
        await new Features(Seller).addMultipleUser(multipleUser, res)
    }

    if (multipleUser) return

    const { name, email, password } = req.body
    let seller = await Seller.create(req.body)

    //sending cookies
    sendCookie(res, 200, { seller, message: "account created succesfully" })
})


// Signin route -- (http://localhost:7070/api/auth/signin)
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //validating the body to ensure it has a vlue
    const isValid = await new Features().validateBody(req.body)

    if (isValid) {
        //checking if it is valid user
        const seller = await new Features(Seller).validateSeller({ email })

        if (!seller)
            return next(new ErrorHandler("Invalid email or password", 401))

        //validating password
        if (!await seller.isValidPassword(password))
            return next(new ErrorHandler("Invalid email or password", 401))

        await new Features().delay1Second(0.10)
        
        sendCookie(res, 200, { seller, message: "signed in succesfully" })
    }
})

// update account route -- (http://localhost:7070/api/auth/update)
export const updateAccount = catchAsyncError(async (req, res, next) => {
    const { seller } = req   //destructuring user in a req object
    const { email, name } = req.body

    if (!email && !name)
        return next(new ErrorHandler("Enter details to update", 400))

    //Assigning a new value to the user object 
    seller.name = name ?? seller.name
    seller.email = email ?? seller.email

    //saving the object in database
    const updatedSeller = await seller.save({ new: true, validateBeforeSave: true })

    if (!updatedSeller) //sending error response,if updates failed
        return next(new ErrorHandler("Account update failed", 401))

    res.status(200).json({
        success: true,
        updatedSeller
    })
})


//change password route --  put (http://localhost:7070/api/auth/changepassword)
export const changePassword = catchAsyncError(async (req, res, next) => {
    const { password, newPassword } = req.body
    const seller = await Seller.findById(req.seller._id).select("+password")

    //validating password
    if (!await seller.isValidPassword(password))
        return next(new ErrorHandler("Incorrect password", 400))

    //udating new password
    seller.password = newPassword
    await seller.save({ validateBeforeSave: true })

    res.status(200).json({
        succes: true,
        meassage: "Password has been changed succesfully"
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
    const seller = await Seller.findById(req.seller.id)
    res.status(200).json({
        success: true,
        seller
    })
})