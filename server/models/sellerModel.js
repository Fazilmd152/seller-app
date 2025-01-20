import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field require"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email field required"],
        validate: [validator.isEmail, "Enter a valid email"],
        unique: true,
        lowercase: true,
    trim: true
    },

    password: {
        type: String,
        required: [true, "Enter your password"],
        maxLength: [15, "password cannot exceed 15 characters"],
        select: false
    },
    description: String,
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'review'
        }
    ],
    rating: {
        type:Number,
        default:1
    }


},
    { timestamps: true })


//hashing password before saving 
sellerSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next()
    this.password = await bcrypt.hash(this.password, 11)
})


// tosave dummy seller otherwise comment this method
// sellerSchema.post('insertMany', async function (docs) {
//     docs.map(async d => {
//         if (d.role === 'seller') {
//             await Seller.create({ seller: d._id, name: d.name })
//         }
//     })
//     console.log('Document saved:');
// })


//generating json web token
sellerSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_time
    })
}

//validating password
sellerSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}


const sellerModel = mongoose.model('seller', sellerSchema)

export default sellerModel
