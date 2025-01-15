import ErrorHandler from "./ErrorHandler.js"



/* This class contains methods to validate the arguments we are passing.
 It helps to avoid duplicated code and
  makes the code easier to understand and weel readable. */
class Features {
    constructor(query) {
        this.query = query
    }

    async createSeller(user) {
        let { _id } = await this.query.create({ seller: user._id, name: user.name })
        const seller = await this.query.findById(_id)
            .populate({
                path: 'seller',
                select: ["email"]
            })
        return seller
    }


    async isSeller(user) {
        //checking the role
        if (user.role !== 'seller')
            return false
        //creating seller if it is seller account and does not exist 
        const seller = await this.query.findOne({ seller: user._id, name: user.name })
        if (!seller) {
            const newSeller = await this.createSeller(user)
            return newSeller
        }
        return seller
    }

    async validateBody(obj, next) {
        if (Object.keys(obj, next).length === 0)
            return next(new ErrorHandler("All the fields are empty", 400));

        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const value = obj[key]
                if (typeof value === 'string' && value.trim() === '') {
                    return next(new ErrorHandler(`${key.charAt(0).toUpperCase() + key.slice(1)} field is a required`, 400))
                }
            }
        }
        return true

    }

    //checking user by his email or id 
    async validateUser({ email, id }) {
        //queriying db dynamically by the arguments
        let user;
        if (email)
            user = await this.query.findOne({ email }).select("+password")

        if (id)
            user = await this.query.findById(id)

        if (!user)
            return false

        return user
    }

    async isHisRating(sellerId, postedBy) {
        let rating = await this.query.findOne({ sellerId, postedBy })
        return rating
    }

    async isHasReview(seller, postedBy) {
        const hasReview = seller.reviews.some(i => i.postedBy.toString() == postedBy.toString())
        if (hasReview)
            return false

        return true
    }

    async paginate(resPerPage, req) {
        const currentPage = Number(req.query.page) || 1
        const skip = resPerPage * (currentPage - 1)
        const sellers = await this.query.find(
            req.query.keyword ?
                { name: { $regex: req.query.keyword, $options: "i" } } : {})
                .populate({path:'reviews',select:["text","rating"],populate: {
                    path: 'postedBy',
                    select: ["name", "createdAt"]
                  }
                })
                .limit(resPerPage)
                .skip(skip)
        return sellers
    }
    async getSeller(resPerPage, req) {

        const sellers = await this.paginate(resPerPage, req)
        return sellers
    }

}

export default Features