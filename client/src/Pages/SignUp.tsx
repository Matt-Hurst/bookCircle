import React, { useState } from 'react'
// import { useHistory } from "react-router-dom";
// import { signup } from '../ApiService/serverApiService';
import './SignUp.scss'

const SignUp = () => {
  const [formValues, setFormValues] = useState({name: '', password: '', confirmPassword: ''})
  const [errorMessage, setErrorMessage] = useState('')

  function onChange (e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) setErrorMessage("Passwords do not match, try again")
    setFormValues({name: '', password: '', confirmPassword: ''})
    console.log(formValues)
    // await login(formValues.name, formValues.password);
    // history.go(0)
  }


  return (
    <div className="SignUpPage">
      <h1 className="SignUph1">Sign Up</h1>
      { errorMessage && <p className="errorMessage">{errorMessage}</p> }
      <div className="SignUpFormContainer">
        <form onSubmit={onSubmit} className="SignUpForm">
          <input type="text" placeholder="Username:" name="name" onChange={onChange} value={formValues.name}/>
          <input type="password" placeholder="Password:" name="password" onChange={onChange} value={formValues.password}/>
          <input type="password" placeholder="Confirm Password:" name="confirmPassword" onChange={onChange} value={formValues.confirmPassword}/>
          <button type="submit" className="signupBTN">Sign Up</button>
        </form>
      </div>
    </div>
      
  )
}

export default SignUp;