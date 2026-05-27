import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchComments } from '../api/reddit'

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async ({ subreddit, postId }, { rejectWithValue }) => {
    try {
      return await fetchComments(subreddit, postId)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byPostId: {},
    status: 'idle',
    error: null,
    currentPostId: null,
  },
  reducers: {
    clearComments(state) {
      state.currentPostId = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
        state.currentPostId = action.meta.arg.postId
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.byPostId[action.meta.arg.postId] = action.payload
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to load comments'
      })
  },
})

export const { clearComments } = commentsSlice.actions

export const selectComments = (postId) => (state) =>
  state.comments.byPostId[postId] || []
export const selectCommentsStatus = (state) => state.comments.status
export const selectCommentsError = (state) => state.comments.error

export default commentsSlice.reducer
