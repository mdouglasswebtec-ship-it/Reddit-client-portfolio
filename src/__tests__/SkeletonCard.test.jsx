import { render, screen } from '@testing-library/react'
import SkeletonCard from '../components/SkeletonCard/SkeletonCard'

describe('SkeletonCard', () => {
  it('renders with aria-hidden for accessibility', () => {
    const { container } = render(<SkeletonCard />)
    const root = container.firstChild
    expect(root).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders multiple skeleton lines', () => {
    const { container } = render(<SkeletonCard />)
    const skeletonEls = container.querySelectorAll('.skeleton')
    expect(skeletonEls.length).toBeGreaterThanOrEqual(4)
  })
})
