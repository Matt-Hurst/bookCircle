import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { login } from '../ApiService/serverApiService';
import './LoginPage.scss'

const LoginPage = () => {
  const [formValues, setFormValues] = useState({name: '', password: ''})
  const history = useHistory();


  function onChange (e: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login(formValues.name, formValues.password);
    setFormValues({name: '', password: ''})
    history.go(0)
  }

  return (
    <div className="LoginPage">
      <div className="LoginPageHeaderDiv">
        <h1 className="LoginPageH1">the Book Circle</h1>
        <span className="LoginPageSpan"></span>
        <h2 className="LoginPageH2">Welcome</h2>
      </div>
      <div className="LoginFormContainer">
        <form onSubmit={onSubmit} className="LoginForm">
          <input type="text" placeholder="Username:" name="name" onChange={onChange} value={formValues.name}/>
          <input type="password" placeholder="Password:" name="password" onChange={onChange} value={formValues.password}/>
          <button type="submit" className="loginBTN">Log In</button>
          <button onClick={() => history.push('/signup')} className="signupBTN">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;