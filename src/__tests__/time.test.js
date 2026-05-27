import { formatDistanceToNow } from '../utils/time'

describe('formatDistanceToNow', () => {
  const now = () => Math.floor(Date.now() / 1000)

  it('returns seconds ago for < 60s', () => {
    const result = formatDistanceToNow(now() - 30)
    expect(result).toMatch(/^\d+s ago$/)
  })

  it('returns minutes ago for < 60min', () => {
    const result = formatDistanceToNow(now() - 300) // 5 min
    expect(result).toBe('5m ago')
  })

  it('returns hours ago for < 24h', () => {
    const result = formatDistanceToNow(now() - 3600 * 3) // 3h
    expect(result).toBe('3h ago')
  })

  it('returns days ago for < 30d', () => {
    const result = formatDistanceToNow(now() - 86400 * 5) // 5 days
    expect(result).toBe('5d ago')
  })

  it('returns months ago for < 12mo', () => {
    const result = formatDistanceToNow(now() - 86400 * 60) // ~2 months
    expect(result).toBe('2mo ago')
  })

  it('returns years ago for >= 12mo', () => {
    const result = formatDistanceToNow(now() - 86400 * 400) // ~1 year
    expect(result).toBe('1y ago')
  })
})
