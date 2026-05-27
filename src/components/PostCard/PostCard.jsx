import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from '../../utils/time'
import { formatScore } from '../../utils/format'
import './PostCard.css'

function PostCard({ post }) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)

  const handleClick = () => {
    navigate(`/r/${post.subreddit}/comments/${post.id}/${encodeURIComponent(post.title.slice(0, 60))}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const showImage =
    !imgError &&
    post.preview &&
    post.post_hint !== 'self' &&
    post.post_hint !== 'link'

  const showThumbnail =
    !imgError &&
    !showImage &&
    post.thumbnail &&
    post.thumbnail.startsWith('http')

  return (
    <article
      className="post-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${post.title} – ${post.num_comments} comments`}
    >
      {/* Vote column */}
      <div className="post-card__vote" onClick={(e) => e.stopPropagation()} aria-label={`Score: ${post.score}`}>
        <button className="post-card__vote-btn post-card__vote-btn--up" aria-label="Upvote">▲</button>
        <span className="post-card__score">{formatScore(post.score)}</span>
        <button className="post-card__vote-btn post-card__vote-btn--down" aria-label="Downvote">▼</button>
      </div>

      {/* Thumbnail (small) */}
      {showThumbnail && (
        <div className="post-card__thumb">
          <img
            src={post.thumbnail}
            alt=""
            aria-hidden="true"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="post-card__content">
        {post.link_flair_text && (
          <span className="post-card__flair">{post.link_flair_text}</span>
        )}
        <h2 className="post-card__title">{post.title}</h2>

        {showImage && (
          <div className="post-card__preview-img">
            <img
              src={post.preview}
              alt={post.title}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        )}

        <div className="post-card__meta">
          <span className="post-card__subreddit">r/{post.subreddit}</span>
          <span className="post-card__separator">•</span>
          <span>Posted by u/{post.author}</span>
          <span className="post-card__separator">•</span>
          <time dateTime={new Date(post.created_utc * 1000).toISOString()}>
            {formatDistanceToNow(post.created_utc)}
          </time>
        </div>

        <div className="post-card__actions">
          <span className="post-card__action">
            💬 {post.num_comments.toLocaleString()} comments
          </span>
          <span className="post-card__action post-card__action--ratio">
            ↑ {Math.round((post.upvote_ratio || 0.5) * 100)}%
          </span>
        </div>
      </div>
    </article>
  )
}

export default PostCard
