export interface Auth{
    loading: boolean,
    isAuthenticated: boolean,
    error: boolean,
    errorMessage: string | null,
    user: {_id?:string,name:string} |null,
}
export interface Review{
    loading: boolean,
    error: boolean,
    count:number,
    fulfilled:boolean | null,
    errorMessage: string | null,
    review: [object] |null,
}
export interface Seller{
    loading: boolean,
    error: boolean,
    count:number,
    errorMessage: string | null,
    sellers: [{_id?:string,}] |null,
}