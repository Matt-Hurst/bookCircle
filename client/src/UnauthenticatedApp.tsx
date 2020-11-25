import React, { useState } from 'react';
import { login } from './ApiService/serverApiService'
import { useHistory } from "react-router-dom"; 
import Header from './Components/AuthHeader'

const UnauthenticatedApp = () => {
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
  <>
    <Header />
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="username" name="name" onChange={onChange} value={formValues.name}/>
      <input type="password" placeholder="password" name="password" onChange={onChange} value={formValues.password}/>
      <button type="submit">login</button>
    </form>
  </>

  )
}

export default UnauthenticatedApp;