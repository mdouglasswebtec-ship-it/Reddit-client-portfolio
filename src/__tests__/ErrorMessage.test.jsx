import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMessage from '../components/ErrorMessage/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders the error message text', () => {
    render(<ErrorMessage message="Something went wrong." />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('shows default text when no message provided', () => {
    render(<ErrorMessage />)
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    const onRetry = jest.fn()
    render(<ErrorMessage message="Error" onRetry={onRetry} />)
    const btn = screen.getByRole('button', { name: /try again/i })
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('does not render retry button when onRetry is absent', () => {
    render(<ErrorMessage message="Error" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
