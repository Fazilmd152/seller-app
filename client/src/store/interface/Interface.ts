export interface AuthStore {
  isAuthenticated: boolean,
  authUser: any|null,
  isSigningUp: boolean,
  isCheckingAuth:boolean,
  isLoggingIn: boolean,
  isChangingPassword: boolean,
  isUpdatingProfile: boolean,
  signIn: (data: any) => void,
  signUp: (data: any) => void,
  changePassword: (data: any) => void,
  signOut:()=>void,
  loadUser:()=>void,
  }

  export interface SellerStore {
    seller: any|null,
  singleSeller:any|null,
    count:number,
    gettingSingleSeller:boolean,
    isGettingSeller:boolean|null,
    getSeller: (data: {keyword?:string,currentPage:number}) => void,
    getSingleSeller: (data:string|undefined) => void,
    }
   
    export  interface ReviewStore{
      newReview:any|null,
      editedReview:any|null,
      review:any[]| null,
    isGettingReview: boolean,
    isPostingReview:boolean,
    isEditingReview:boolean,
    isDeletingReview:boolean,
    
    postReview:(data:{review:string,rating:number,sellerId:string})=>void,
    editReview:(data:{reviewId:string,text:string,rating:number})=>void,
    getReview:(data:string)=>void,
    deleteReview:(data:string)=>void
    }
  
    
  