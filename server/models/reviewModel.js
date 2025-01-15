import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema({
sellerId:{
  type: mongoose.Types.ObjectId,
  req: true,
  ref: 'seller'
},
    postedBy: {
        type: mongoose.Types.ObjectId,
        req: true,
        ref: 'user'
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

const reviewModel = mongoose.model('review', reviewSchema)

export default reviewModel

// reviews: [
//   {
//       type: mongoose.Types.ObjectId,
//       ref: 'review'
//   }
// ],

// ratings: [
//     { rating: {
//         type: Number,
//         min: [0, 'Rating must be at least 0'],
//         max: [5, 'Rating cannot exceed 5'],
//         default: 0
//     },
//     givenBy: {
//         type: mongoose.Types.ObjectId,
//         required: true
//     }
//     }
// ]