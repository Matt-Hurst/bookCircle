import React from 'react';
import Search from './Pages/Search'
import AuthHeader from './Components/AuthHeader'
import { User } from './Interfaces'


interface myProps {
  user: User;
}

const AuthenticatedApp = (props: myProps) => {

  return (
  <>
    <AuthHeader />
    <Search user={props.user}/>
  </>

  )
}

export default AuthenticatedApp;