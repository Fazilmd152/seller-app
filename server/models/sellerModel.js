import mongoose from 'mongoose'

const sellerSchema = mongoose.Schema({
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    name:{
        type:String,
        required:[true,"please add sellers name"]
    },

    description: String,
    reviews:[
        {
        type:mongoose.Types.ObjectId,
        ref:'review'
        }
    ]

    
},
    { timestamps: true })

const sellerModel = mongoose.model('seller', sellerSchema)

export default sellerModel