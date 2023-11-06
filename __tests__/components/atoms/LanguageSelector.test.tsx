import { render, screen, waitFor } from '@testing-library/react'
import LanguageSelector, {
  languages,
} from '@/components/atoms/LanguageSelector'
import userEvent from '@testing-library/user-event'

let selectedLang: string

// Mock next/navigation:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      replace: (url: string) => {
        selectedLang = url.split('/')[1]
      },
    }
  },
  usePathname() {
    return '/en/jobs'
  },
}))

function initialize(showLang?: boolean) {
  const user = userEvent.setup()
  render(<LanguageSelector showSelectedLangName={showLang} />)
  selectedLang = 'en'
  return { user }
}

function getTriggerAndChildren() {
  const trigger = screen.getByRole('button')!
  const image = trigger.querySelector('img')!
  const span = trigger.querySelector('span')

  return { trigger, image, span }
}

function getDropdownAndOptions() {
  const dropdown = screen.getByRole('menu')!
  const options = dropdown.querySelectorAll('button')!

  return { dropdown, options }
}

function getOptionChildren(option: HTMLButtonElement) {
  const image = option.querySelector('img')!
  const span = option.querySelector('span')!

  return { image, span }
}

function expectDropdownNotShown() {
  expect(screen.queryByRole('menu')).toBeNull()
}

describe('LanguageSelector', () => {
  it('should render the component', () => {
    const expectedImage = 'us-flag.png'
    initialize()

    const { trigger, image, span } = getTriggerAndChildren()
    expect(span).toBeNull()
    expect(trigger).toBeInTheDocument()
    expect(image.src).toContain(expectedImage)
  })

  it('should show options dropdown when clicking trigger', async () => {
    const expectedOptions = new Map(
      Object.values(languages).map(({ key, name }) => [key, name])
    )

    const { user } = initialize()
    const { trigger } = getTriggerAndChildren()

    // Options are not shown
    expectDropdownNotShown()

    // On click, options are shown
    await user.click(trigger)
    const { dropdown, options } = getDropdownAndOptions()
    expect(dropdown).toBeInTheDocument()
    expect(options).toHaveLength(2)

    // Validating shown options
    options.forEach((option) => {
      const { image, span } = getOptionChildren(option)
      const { alt } = image
      const [key] = alt.split(' ')
      const expectedOpt = expectedOptions.get(key)

      expect(expectedOpt).not.toBeUndefined()
      expect(image.src).toContain(`${key}-flag.png`)
      expect(span.innerHTML).toBe(expectedOpt)
    })
  })

  it('should hide options, when options are shown and clicking outside', async () => {
    const { user } = initialize()
    const { trigger } = getTriggerAndChildren()

    await user.click(trigger)
    await user.click(document.body)

    expectDropdownNotShown()
  })

  it('should hide dropdown and change selected option when selecting other option than the current selected', async () => {
    let optionToSelect
    const { user } = initialize()
    const { trigger, image } = getTriggerAndChildren()

    const [selectedOptionKey] = image.alt.split(' ')
    const selectedOption = trigger.dataset.lang
    await user.click(trigger)

    const { options } = getDropdownAndOptions()

    optionToSelect = [...options].find((option) => {
      const optionImage = option.querySelector('img')!
      return !optionImage.alt.includes(selectedOptionKey)
    })!

    await user.click(optionToSelect)
    expectDropdownNotShown()
    expect(selectedLang).not.toEqual(selectedOption)
  })

  it('should hide dropdown when selecting the same option than the current selected', async () => {
    let optionToSelect
    const { user } = initialize()
    const { trigger, image } = getTriggerAndChildren()
    const [selectedOptionKey] = image.alt.split(' ')
    const selectedOption = trigger.dataset.lang
    await user.click(trigger)

    const { options } = getDropdownAndOptions()

    optionToSelect = [...options].find((option) => {
      const optionImage = option.querySelector('img')!
      return optionImage.alt.includes(selectedOptionKey)
    })!

    await user.click(optionToSelect)
    expectDropdownNotShown()
    expect(selectedLang).toEqual(selectedOption)
  })

  it('should show language in trigger if related option is on', () => {
    initialize(true)
    const { span } = getTriggerAndChildren()
    expect(span).not.toBeNull()
  })
})
