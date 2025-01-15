export interface SignInModel{
    email:string,
    password:string
}
export interface SignUpModel{
    name:string
    email:string,
    password:string,
    role?:string
}

export interface ReviewModel{
    review:string,
    rating?:number | null
    sellerId?:string |null
}

export interface ChangePassword{
    password:string,
    newPassword:string}

export interface EditReviewModel{
    text:string,
    rating?:number | null
    reviewId?:string |null}