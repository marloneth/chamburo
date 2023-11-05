import { render, screen } from '@testing-library/react'
import HomePage from '@/app/[lang]/page'

it('should have docs text', () => {
  render(<HomePage params={{ lang: 'en' }} />) // ARRANGE

  const myElem = screen.getByText('Find') // ACT

  expect(myElem).toBeInTheDocument() // ASSERT
})
