import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  loadPosts,
  selectPosts,
  selectPostsStatus,
  selectPostsError,
  selectAfter,
  selectActiveSubreddit,
  setActiveSubreddit,
  clearPosts,
} from '../../store/postsSlice'
import PostCard from '../PostCard/PostCard'
import SkeletonCard from '../SkeletonCard/SkeletonCard'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import './PostList.css'

function PostList() {
  const dispatch = useDispatch()
  const { subreddit } = useParams()
  const posts = useSelector(selectPosts)
  const status = useSelector(selectPostsStatus)
  const error = useSelector(selectPostsError)
  const after = useSelector(selectAfter)
  const activeSubreddit = useSelector(selectActiveSubreddit)

  const targetSubreddit = subreddit || 'popular'

  useEffect(() => {
    if (targetSubreddit !== activeSubreddit) {
      dispatch(setActiveSubreddit(targetSubreddit))
      dispatch(clearPosts())
      dispatch(loadPosts({ subreddit: targetSubreddit }))
    } else if (status === 'idle') {
      dispatch(loadPosts({ subreddit: targetSubreddit }))
    }
  }, [targetSubreddit]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadMore = () => {
    if (after && status !== 'loading') {
      dispatch(loadPosts({ subreddit: activeSubreddit, after }))
    }
  }

  const handleRetry = () => {
    dispatch(clearPosts())
    dispatch(loadPosts({ subreddit: activeSubreddit }))
  }

  const isInitialLoad = status === 'loading' && posts.length === 0

  return (
    <section className="post-list" aria-label="Reddit posts">
      <div className="post-list__header">
        <h1 className="post-list__title">
          {activeSubreddit === 'popular' ? '🔥 Popular' : `r/${activeSubreddit}`}
        </h1>
      </div>

      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      <div className="post-list__items">
        {isInitialLoad
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      {posts.length === 0 && status === 'succeeded' && (
        <div className="post-list__empty">
          <p>No posts found. Try a different search or community.</p>
        </div>
      )}

      {status === 'loading' && posts.length > 0 && (
        <div className="post-list__loading-more" aria-live="polite">
          <div className="spinner" aria-label="Loading more posts" />
        </div>
      )}

      {after && status !== 'loading' && posts.length > 0 && (
        <div className="post-list__load-more">
          <button className="btn btn--outline" onClick={handleLoadMore}>
            Load more posts
          </button>
        </div>
      )}
    </section>
  )
}

export default PostList
