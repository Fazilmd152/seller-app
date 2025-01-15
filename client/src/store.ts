import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/slices/authSlice.ts'
import reviewReducer from './redux/slices/reviewSlice.ts'
import sellerReducer from './redux/slices/sellerSlice.ts'
import commentReducer from './redux/slices/commentState.ts'

const reducer = combineReducers({
authState:authReducer,
reviewState:reviewReducer,
sellerState:sellerReducer,
commentState:commentReducer
})



const store = configureStore({
    reducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store