import { formatScore } from '../utils/format'

describe('formatScore', () => {
  it('returns the number as string when < 1000', () => {
    expect(formatScore(500)).toBe('500')
    expect(formatScore(0)).toBe('0')
    expect(formatScore(-42)).toBe('-42')
  })

  it('formats thousands with k suffix', () => {
    expect(formatScore(1000)).toBe('1k')
    expect(formatScore(12345)).toBe('12.3k')
    expect(formatScore(1500)).toBe('1.5k')
  })

  it('drops trailing .0 in k format', () => {
    expect(formatScore(2000)).toBe('2k')
    expect(formatScore(10000)).toBe('10k')
  })

  it('returns bullet for null/undefined', () => {
    expect(formatScore(null)).toBe('•')
    expect(formatScore(undefined)).toBe('•')
  })
})
