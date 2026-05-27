import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="not-found">
      <div className="not-found__code">404</div>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__desc">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button className="btn btn--primary" onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  )
}

export default NotFound
