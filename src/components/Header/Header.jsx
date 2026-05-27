import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setSearchQuery,
  setActiveSubreddit,
  searchPosts,
  loadPosts,
  clearPosts,
  selectSearchQuery,
  selectActiveSubreddit,
} from '../../store/postsSlice'
import './Header.css'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchQuery = useSelector(selectSearchQuery)
  const activeSubreddit = useSelector(selectActiveSubreddit)
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      const q = inputValue.trim()
      dispatch(setSearchQuery(q))
      if (q) {
        dispatch(searchPosts({ subreddit: activeSubreddit, query: q }))
      } else {
        dispatch(clearPosts())
        dispatch(loadPosts({ subreddit: activeSubreddit }))
      }
    },
    [dispatch, inputValue, activeSubreddit]
  )

  const handleLogoClick = () => {
    setInputValue('')
    dispatch(setSearchQuery(''))
    dispatch(setActiveSubreddit('popular'))
    dispatch(clearPosts())
    dispatch(loadPosts({ subreddit: 'popular' }))
    navigate('/')
  }

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <button className="header__logo" onClick={handleLogoClick} aria-label="Go to homepage">
          <svg viewBox="0 0 20 20" className="header__logo-icon" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill="#10B981" />
            <path
              d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.08 2.13.45a1 1 0 1 0 1-1 1 1 0 0 0-.96.68l-2.38-.5a.27.27 0 0 0-.32.2l-.73 3.44a7.14 7.14 0 0 0-3.89 1.23 1.46 1.46 0 1 0-1.61 2.39 2.9 2.9 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.9 2.9 0 0 0 0-.44 1.46 1.46 0 0 0 .68-1.58zM7.27 11a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.58 2.65a3.59 3.59 0 0 1-2.85.78 3.59 3.59 0 0 1-2.85-.78.28.28 0 0 1 .38-.38 3.07 3.07 0 0 0 2.47.6 3.07 3.07 0 0 0 2.47-.6.28.28 0 0 1 .38.38zm-.18-1.65a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
              fill="#fff"
            />
          </svg>
          <span className="header__logo-text">RedditMat</span>
        </button>

        <form className="header__search" onSubmit={handleSearch} role="search">
          <label htmlFor="search-input" className="sr-only">Search Reddit</label>
          <input
            id="search-input"
            className="header__search-input"
            type="search"
            placeholder="Search Reddit…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Search Reddit posts"
          />
          <button type="submit" className="header__search-btn" aria-label="Submit search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header
