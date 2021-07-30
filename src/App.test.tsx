import { render, screen } from '@testing-library/react'
import { App } from './App'

test('renders form', () => {
  render(<App />)
  const rootForm = screen.getByTestId('root-form')
  expect(rootForm).toBeInTheDocument()
})
