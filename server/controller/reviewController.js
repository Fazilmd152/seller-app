import catchAsyncError from "../middlewares/catchAsyncError.js";
import Review from "../models/reviewModel.js";
import Seller from "../models/sellerModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Features from "../utils/Features.js";


//custom response function 
function sendResponse(res, message, data) {
    res.status(200).json({
        success: true,
        message,
        data
    })
}


//Add review route -- post (http://localhost:7070/api/review/addreview/:id)
export const addReview = catchAsyncError(async (req, res, next) => {
    const { review: text, rating } = req.body
    const { id: sellerId } = req.params  //Destrcturing and renaming 
    const { _id: postedBy } = req.user //params and arguments

    //checking if req body is empty
    const isValid = await new Features().validateBody(req.body, next)
    //cheacking weather seller exists
    const seller = await Seller.findById(sellerId).populate({ path: 'reviews', select: ["postedBy", "-_id"] })
    if (!seller)
        return next(new ErrorHandler("Seller not found", 400))

    // checking if he already reviewed one user can comment
    // and rate only one time for one seller
    if (!await new Features(Review).isHasReview(seller, postedBy))
        return next(new ErrorHandler("You have posted a review already", 400))

    if (isValid) {
        //inserting review in database
        const review = await Review.create({ sellerId, postedBy, text, rating })
        if (review) {
            seller.reviews.push(review._id)
            await seller.save()
            return sendResponse(res, "Review posted succesfully", review)
        }
    }
})


//Edit review route -- put (http://localhost:7070/api/review/:id)
export const editReview = catchAsyncError(async (req, res, next) => {
    const { text, rating } = req.body
    const { id: reviewId } = req.params  //Destrcturing and renaming
    const { _id: postedBy } = req.user //params and arguments

    console.log(text);

    //checking if req body is empty 
    const isValid = await new Features().validateBody(req.body, next)
    //finding review in db
    const review = await Review.findById(reviewId)

    //preventing others from edit the comment, 
    // for that comparing the users id and postedBy id
    if (review.postedBy.toString() !== postedBy.toString())
        return next(new ErrorHandler("You cannot edit this post", 404))

    if (isValid) {
        review.text = text ?? review.text //saving into the database
        review.rating = rating ?? review.rating //saving into the database
        const newReview = await review.save({ validateBeforeSave: true, new: true })

        if (newReview)
            return sendResponse(res, "Review updated succesfully", newReview)
    }
})


//delete review route --   delete (http://localhost:7070/api/review/:id)
export const deleteReview = catchAsyncError(async (req, res, next) => {
    const { id: reviewId } = req.params
    const review = await Review.findById({ _id: reviewId })
    const seller = await Seller.findById(review.sellerId)
    seller.reviews.pull(reviewId)
    await seller.save()
    await review.deleteOne()

    res.status(200).json({
        success: true,
        message: "Review deleted succesfully"
    })

})