import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import commentsReducer from './commentsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
})

export default store
