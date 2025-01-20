import mongoose from 'mongoose'
import Seller from './sellerModel.js'


const reviewSchema = mongoose.Schema({
  sellerId: {
    type: mongoose.Types.ObjectId,
    req: true,
    ref: 'seller'
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    req: true,
    ref: 'seller'
  },
  text: {
    type: String,
    req: [true, "Provide a review to add"],
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 1
  }
},
  { timestamps: true })



reviewSchema.post('save', async function (doc) {
  await addRating(doc)
})


const reviewModel = mongoose.model('review', reviewSchema)


export default reviewModel


async function addRating(doc) {
  const seller = await Seller.findById(doc.sellerId)
  if (!seller) return
  const reviews = await reviewModel.find({ sellerId: seller._id })
  if (!reviews) return
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
  seller.rating = totalRating / reviews.length ?? seller.rating
  await seller.save()
}


