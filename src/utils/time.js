/**
 * Returns a human-readable relative time string, e.g. "3 hours ago"
 * @param {number} utcSeconds - Unix timestamp in seconds
 */
export function formatDistanceToNow(utcSeconds) {
  const now = Date.now()
  const then = utcSeconds * 1000
  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 60) return `${diffSec}s ago`
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 30) return `${diffDay}d ago`
  const diffMo = Math.floor(diffDay / 30)
  if (diffMo < 12) return `${diffMo}mo ago`
  const diffYr = Math.floor(diffMo / 12)
  return `${diffYr}y ago`
}
