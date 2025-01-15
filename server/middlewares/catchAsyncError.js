//wrapping controller fuctions to catch the errors
//if there is any error it will call our custom errormiddleware

const catchAsyncError=func=>(req,res,next)=>
    Promise.resolve(func(req,res,next)).catch(next)


export default catchAsyncError