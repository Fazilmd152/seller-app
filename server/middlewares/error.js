// sending error response ,if any errors caught in controller
//catchAsyncError wrapper function redirects to this response, if error caught

export default (err, req, res, next) => {

    err.statuscode = err.statusCode || 500
    
    res.status(err.statuscode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        //err
    })
    
}