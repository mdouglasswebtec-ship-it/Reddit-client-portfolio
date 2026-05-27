import postsReducer, {
  setSearchQuery,
  setActiveSubreddit,
  clearPosts,
  selectPosts,
  selectActiveSubreddit,
  selectSearchQuery,
} from '../store/postsSlice'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  after: null,
  searchQuery: '',
  activeSubreddit: 'popular',
}

describe('postsSlice reducer', () => {
  it('returns the initial state', () => {
    expect(postsReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  it('setSearchQuery updates searchQuery', () => {
    const state = postsReducer(initialState, setSearchQuery('react'))
    expect(state.searchQuery).toBe('react')
  })

  it('setActiveSubreddit changes subreddit and resets items/after', () => {
    const stateWithItems = { ...initialState, items: [{ id: '1' }], after: 't3_abc' }
    const state = postsReducer(stateWithItems, setActiveSubreddit('technology'))
    expect(state.activeSubreddit).toBe('technology')
    expect(state.items).toHaveLength(0)
    expect(state.after).toBeNull()
  })

  it('clearPosts resets to idle state', () => {
    const stateWithItems = { ...initialState, items: [{ id: '1' }], status: 'succeeded', after: 't3_abc' }
    const state = postsReducer(stateWithItems, clearPosts())
    expect(state.items).toHaveLength(0)
    expect(state.after).toBeNull()
    expect(state.status).toBe('idle')
    expect(state.error).toBeNull()
  })
})

describe('postsSlice selectors', () => {
  const mockState = {
    posts: {
      ...initialState,
      items: [{ id: '1', title: 'Test' }],
      activeSubreddit: 'gaming',
      searchQuery: 'unity',
    },
  }

  it('selectPosts returns items array', () => {
    expect(selectPosts(mockState)).toEqual([{ id: '1', title: 'Test' }])
  })

  it('selectActiveSubreddit returns current subreddit', () => {
    expect(selectActiveSubreddit(mockState)).toBe('gaming')
  })

  it('selectSearchQuery returns current query', () => {
    expect(selectSearchQuery(mockState)).toBe('unity')
  })
})
