import catchAsyncError from "../middlewares/catchAsyncError.js";
import Seller from "../models/sellerModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Features from "../utils/Features.js";



//get all sellers  route -- (http://localhost:7070/api/seller)
export const getAllSeller = catchAsyncError(async (req, res, next) => {

    let resPerPage = 8
    const seller = await new Features(Seller).getSeller(resPerPage, req)
    let count = await await Seller.countDocuments()
  

    if (!seller)
        return next(new ErrorHandler("No sellers found", 400))

    if (req.query.keyword && seller) {
        count = seller.length
    }
await new Features().delay1Second(0.20)
    res.status(200).json({
        success: true,
        count,
        message: "Sellers found succesfully",
        seller
    })
})

//get single sellers  route -- (http://localhost:7070/api/seller)
export const getSingleSeller = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const seller = await Seller.findById(id)
    if (!seller)
        return next(new ErrorHandler("No sellers found", 400))


    res.status(200).json({
        success: true,
        message: "Seller found succesfully",
        seller
    })
})

//adding description(optional) route -- (http://localhost:7070/api/seller/desc)
export const addDescription = catchAsyncError(async (req, res, next) => {
    const { description } = req.body
    const { seller:user } = req
    //validating the req body
    if (!description)
        return next(new ErrorHandler("Enter description", 400))

    //checking the user's role
    const seller = await new Features(Seller).isSeller(user)
    if (!seller)
        return next(new ErrorHandler("You are not authorized for this", 400))

    //saving into the database
    seller.description = description ?? seller.description
    await seller.save({ new: true, validateBeforeSave: true })

    res.status(200).json({
        success: true,
        message: "Description added succesfully",
        seller
    })
})



