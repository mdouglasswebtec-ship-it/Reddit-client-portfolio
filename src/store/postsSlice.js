import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPosts, fetchSearchResults } from '../api/reddit'

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({ subreddit, after = '' }, { rejectWithValue }) => {
    try {
      return await fetchPosts(subreddit, after)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async ({ subreddit, query }, { rejectWithValue }) => {
    try {
      return await fetchSearchResults(subreddit, query)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    after: null,
    searchQuery: '',
    activeSubreddit: 'popular',
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setActiveSubreddit(state, action) {
      state.activeSubreddit = action.payload
      state.items = []
      state.after = null
      state.searchQuery = ''
    },
    clearPosts(state) {
      state.items = []
      state.after = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const newItems = action.payload.posts.filter(
          (p) => !state.items.find((e) => e.id === p.id)
        )
        state.items = [...state.items, ...newItems]
        state.after = action.payload.after
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to load posts'
      })
      .addCase(searchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.items = []
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.posts
        state.after = action.payload.after
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Search failed'
      })
  },
})

export const { setSearchQuery, setActiveSubreddit, clearPosts } = postsSlice.actions

// Selectors
export const selectPosts = (state) => state.posts.items
export const selectPostsStatus = (state) => state.posts.status
export const selectPostsError = (state) => state.posts.error
export const selectAfter = (state) => state.posts.after
export const selectSearchQuery = (state) => state.posts.searchQuery
export const selectActiveSubreddit = (state) => state.posts.activeSubreddit

export default postsSlice.reducer
