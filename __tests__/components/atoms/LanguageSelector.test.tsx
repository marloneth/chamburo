import { render, screen } from '@testing-library/react'
import LanguageSelector from '@/components/atoms/LanguageSelector'

// Mock next/navigation:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
  usePathname() {
    return '/en/jobs'
  },
}))

describe('LanguageSelector', () => {
  it('should render the component', () => {
    render(<LanguageSelector />) // ARRANGE

    const myElem = screen.getByRole('button') // ACT

    expect(myElem).toBeInTheDocument() // ASSERT
  })
})
