import React, { useState, useEffect } from 'react'

export const errorMessages = {
  name: 'Name must be at least 3 characters.',
  email: 'Email must be valid.',
  agreeTerms: 'You must agree to the terms.',
  gender: 'You must select a gender.',
}
export const successMessage = 'form was sent successfully!'

function MyFormComponent() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    agreeTerms: false,
    gender: '',
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm((prevForm) => ({
      ...prevForm,

      [name]: type === 'checkbox' ? checked : value,
    }))
    setSuccess(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!Object.keys(errors).length) {
      setSuccess(true)
    }
  }

  useEffect(() => {
    let newErrors = {}

    if (form.name.length < 3) newErrors.name = errorMessages.name

    if (!form.email.includes('@')) newErrors.email = errorMessages.email

    if (!form.agreeTerms) newErrors.agreeTerms = errorMessages.agreeTerms

    if (!form.gender) newErrors.gender = errorMessages.gender

    setErrors(newErrors)
  }, [form])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <p>{errors.name}</p>}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="checkbox"
          name="agreeTerms"
          checked={form.agreeTerms}
          onChange={handleChange}
        />{' '}
        Agree to Terms
        {errors.agreeTerms && <p>{errors.agreeTerms}</p>}
        <input
          type="radio"
          name="gender"
          value="male"
          checked={form.gender === 'male'}
          onChange={handleChange}
        />{' '}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={form.gender === 'female'}
          onChange={handleChange}
        />{' '}
        Female
        {errors.gender && <p>{errors.gender}</p>}
        <button type="submit">Submit</button>
      </form>
      {success && <p>form was sent successfully!</p>}
    </>
  )
}

export default MyFormComponent
