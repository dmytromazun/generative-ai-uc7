import { render, screen, fireEvent } from '@testing-library/react'
import MyFormComponent, {
  errorMessages,
  successMessage,
} from './MyFormComponent'

beforeEach(() => {
  render(<MyFormComponent />)
  const nameField = screen.getByPlaceholderText('Name')
  const emailField = screen.getByPlaceholderText('Email')
  fireEvent.change(nameField, { target: { value: 'John' } })
  fireEvent.change(emailField, { target: { value: 'johndoe@gmail.com' } })
})

describe('Positive Test Cases', () => {
  it(`Submit the form with all fields filled in correctly: a name of 3 or more characters, a valid email, 'Agree to Terms' checked, and a gender selected.`, () => {
    const genderMaleRadioButton = screen.getByDisplayValue('male')
    const agreeTermsCheckbox = screen.getByRole('checkbox')
    const submitButton = screen.getByText('Submit')
    fireEvent.click(agreeTermsCheckbox)
    fireEvent.click(genderMaleRadioButton)
    fireEvent.click(submitButton)

    expect(screen.queryByText(successMessage)).toBeInTheDocument()
  })

  it('Submit the form with a very long valid name to check if the form can handle names of any length.', () => {
    const veryLongName = 'Qwertyuiopasdfghjklzxcvbnm'
    const nameField = screen.getByPlaceholderText('Name')
    const genderMaleRadioButton = screen.getByDisplayValue('male')
    const agreeTermsCheckbox = screen.getByRole('checkbox')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(nameField, { target: { value: veryLongName } })
    fireEvent.click(agreeTermsCheckbox)
    fireEvent.click(genderMaleRadioButton)
    fireEvent.click(submitButton)

    expect(screen.queryByText(successMessage)).toBeInTheDocument()
  })

  it('Submit the form with a complex email address that is valid (e.g., test.name+alias@example.co.uk) to test the robustness of the email validation.', () => {
    const complexEmailAddress = 'test.name+alias@example.co.uk'
    const emailField = screen.getByPlaceholderText('Email')
    const genderMaleRadioButton = screen.getByDisplayValue('male')
    const agreeTermsCheckbox = screen.getByRole('checkbox')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(emailField, { target: { value: complexEmailAddress } })
    fireEvent.click(agreeTermsCheckbox)
    fireEvent.click(genderMaleRadioButton)
    fireEvent.click(submitButton)

    expect(screen.queryByText(successMessage)).toBeInTheDocument()
  })

  it('Change the gender from male to female and submit the form with all other fields filled in correctly.', () => {
    const complexEmailAddress = 'test.name+alias@example.co.uk'
    const emailField = screen.getByPlaceholderText('Email')
    const genderMaleRadioButton = screen.getByDisplayValue('male')
    const genderFemaleRadioButton = screen.getByDisplayValue('female')
    const agreeTermsCheckbox = screen.getByRole('checkbox')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(emailField, { target: { value: complexEmailAddress } })
    fireEvent.click(agreeTermsCheckbox)
    fireEvent.click(genderMaleRadioButton)
    fireEvent.click(genderFemaleRadioButton)
    fireEvent.click(submitButton)

    expect(screen.queryByText(successMessage)).toBeInTheDocument()
  })

  it('Re-submit the form after an initial successful submission with all fields filled in correctly.', () => {
    const complexEmailAddress = 'test.name+alias@example.co.uk'
    const emailField = screen.getByPlaceholderText('Email')
    const genderMaleRadioButton = screen.getByDisplayValue('male')
    const genderFeMaleRadioButton = screen.getByDisplayValue('female')
    const agreeTermsCheckbox = screen.getByRole('checkbox')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(emailField, { target: { value: complexEmailAddress } })
    fireEvent.click(agreeTermsCheckbox)
    fireEvent.click(genderMaleRadioButton)
    fireEvent.click(genderFeMaleRadioButton)
    fireEvent.click(submitButton)

    expect(screen.queryByText(successMessage)).toBeInTheDocument()

    fireEvent.click(submitButton)

    expect(screen.queryByText(successMessage)).toBeInTheDocument()
  })
})

describe('Negative  Test Cases', () => {
  it('Submit the form without selecting a gender.', () => {
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    expect(screen.getByText(errorMessages.gender)).toBeInTheDocument()
    expect(screen.queryByText(successMessage)).not.toBeInTheDocument()
  })

  it('Submit the form with an invalid email address (e.g., without the "@" symbol).', () => {
    const invalidEmailAddress = 'johndoemail.com'
    const emailField = screen.getByPlaceholderText('Email')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(emailField, { target: { value: invalidEmailAddress } })
    fireEvent.click(submitButton)

    expect(screen.getByText(errorMessages.email)).toBeInTheDocument()
  })

  it(`Submit the form without checking the 'Agree to Terms' checkbox.`, () => {
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    expect(screen.getByText(errorMessages.agreeTerms)).toBeInTheDocument()
  })

  it(`Submit the form without selecting a gender.`, () => {
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)

    expect(screen.getByText(errorMessages.gender)).toBeInTheDocument()
  })

  it(`Submit the form with a name that is less than 3 characters long.`, () => {
    const incorrectName = 'Qw'
    const nameField = screen.getByPlaceholderText('Name')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(nameField, { target: { value: incorrectName } })
    fireEvent.click(submitButton)

    expect(screen.getByText(errorMessages.gender)).toBeInTheDocument()
  })
})
