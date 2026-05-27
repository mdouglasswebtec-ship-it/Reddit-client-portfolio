import { useState } from 'react'
import { formatDistanceToNow } from '../../utils/time'
import { formatScore } from '../../utils/format'
import './CommentTree.css'

function Comment({ comment, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false)

  if (!comment.body || comment.body === '[deleted]' || comment.body === '[removed]') return null

  return (
    <div className={`comment comment--depth-${Math.min(depth, 6)}`} style={{ '--depth': depth }}>
      <div className="comment__thread-line" aria-hidden="true" />
      <div className="comment__inner">
        <div className="comment__header">
          <button
            className="comment__collapse"
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand comment' : 'Collapse comment'}
          >
            [{collapsed ? '+' : '−'}]
          </button>
          <span className="comment__author">u/{comment.author}</span>
          <span className="comment__score">{formatScore(comment.score)} pts</span>
          <time className="comment__time">{formatDistanceToNow(comment.created_utc)}</time>
        </div>

        {!collapsed && (
          <>
            <p className="comment__body">{comment.body}</p>
            {comment.replies && comment.replies.length > 0 && (
              <div className="comment__replies">
                {comment.replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} depth={depth + 1} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function CommentTree({ comments }) {
  return (
    <div className="comment-tree">
      {comments.map((c) => (
        <Comment key={c.id} comment={c} depth={0} />
      ))}
    </div>
  )
}

export default CommentTree
