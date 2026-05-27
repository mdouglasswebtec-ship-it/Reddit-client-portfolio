import './SkeletonCard.css'

function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__vote">
        <div className="skeleton skeleton-card__vote-score" />
      </div>
      <div className="skeleton-card__content">
        <div className="skeleton skeleton-card__line skeleton-card__line--title" />
        <div className="skeleton skeleton-card__line skeleton-card__line--title skeleton-card__line--short" />
        <div className="skeleton skeleton-card__line skeleton-card__line--meta" />
        <div className="skeleton skeleton-card__line skeleton-card__line--actions" />
      </div>
    </div>
  )
}

export default SkeletonCard
