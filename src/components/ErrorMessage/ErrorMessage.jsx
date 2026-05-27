import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert" aria-live="assertive">
      <div className="error-message__icon" aria-hidden="true">⚠️</div>
      <div className="error-message__content">
        <p className="error-message__text">{message || 'Something went wrong.'}</p>
        {onRetry && (
          <button className="btn btn--primary error-message__retry" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
