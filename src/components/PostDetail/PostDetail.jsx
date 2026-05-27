import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadComments, selectComments, selectCommentsStatus, selectCommentsError, clearComments } from '../../store/commentsSlice'
import { selectPosts } from '../../store/postsSlice'
import CommentTree from '../CommentTree/CommentTree'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { formatDistanceToNow } from '../../utils/time'
import { formatScore } from '../../utils/format'
import './PostDetail.css'

function PostDetail() {
  const { subreddit, postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const posts = useSelector(selectPosts)
  const post = posts.find((p) => p.id === postId)
  const comments = useSelector(selectComments(postId))
  const status = useSelector(selectCommentsStatus)
  const error = useSelector(selectCommentsError)

  useEffect(() => {
    dispatch(loadComments({ subreddit, postId }))
    return () => dispatch(clearComments())
  }, [postId, subreddit, dispatch])

  const handleBack = () => navigate(-1)

  const handleRetry = () => dispatch(loadComments({ subreddit, postId }))

  return (
    <div className="post-detail">
      <button className="post-detail__back btn" onClick={handleBack} aria-label="Go back">
        ← Back
      </button>

      {post ? (
        <article className="post-detail__post">
          <div className="post-detail__vote">
            <button className="post-card__vote-btn" aria-label="Upvote">▲</button>
            <span className="post-detail__score">{formatScore(post.score)}</span>
            <button className="post-card__vote-btn" aria-label="Downvote">▼</button>
          </div>
          <div className="post-detail__body">
            {post.link_flair_text && (
              <span className="post-card__flair">{post.link_flair_text}</span>
            )}
            <h1 className="post-detail__title">{post.title}</h1>
            <div className="post-detail__meta">
              <span className="post-detail__sub">r/{post.subreddit}</span>
              <span> • Posted by u/{post.author} • </span>
              <time>{formatDistanceToNow(post.created_utc)}</time>
            </div>

            {post.selftext && (
              <div className="post-detail__selftext">
                <p>{post.selftext.slice(0, 2000)}{post.selftext.length > 2000 ? '…' : ''}</p>
              </div>
            )}

            {post.preview && !post.is_self && (
              <div className="post-detail__media">
                <img src={post.preview} alt={post.title} />
              </div>
            )}

            {!post.is_self && !post.preview && post.url && (
              <a
                className="post-detail__link"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                🔗 {post.url}
              </a>
            )}

            <div className="post-detail__stats">
              <span>💬 {post.num_comments.toLocaleString()} comments</span>
              <span>↑ {Math.round((post.upvote_ratio || 0.5) * 100)}% upvoted</span>
            </div>
          </div>
        </article>
      ) : (
        <div className="post-detail__post post-detail__post--placeholder">
          <p className="post-detail__loading-title skeleton" style={{ height: 24, width: '70%', marginBottom: 8 }} />
          <p className="skeleton" style={{ height: 16, width: '40%' }} />
        </div>
      )}

      <section className="post-detail__comments" aria-label="Comments">
        <h2 className="post-detail__comments-title">
          Comments {post ? `(${post.num_comments.toLocaleString()})` : ''}
        </h2>

        {error && <ErrorMessage message={error} onRetry={handleRetry} />}

        {status === 'loading' && (
          <div className="post-detail__comments-loading">
            <div className="spinner" aria-label="Loading comments" />
          </div>
        )}

        {status === 'succeeded' && comments.length === 0 && (
          <p className="post-detail__no-comments">No comments yet.</p>
        )}

        {status === 'succeeded' && comments.length > 0 && (
          <CommentTree comments={comments} />
        )}
      </section>
    </div>
  )
}

export default PostDetail
