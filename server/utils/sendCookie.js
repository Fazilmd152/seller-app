export default function (res, statusCode, { user, seller, message }) {
    const token = user.getJwtToken()

    const options = {
        maxAge: process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict'
    }
    user.password = null
    res.status(statusCode).cookie('sellerCookie', token, options).json({
        success: true,
        message: message ? message : "action completed succesfully",
        user: user ?? seller

    })
}