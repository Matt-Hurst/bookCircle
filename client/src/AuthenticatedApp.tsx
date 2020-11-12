import React from 'react';
import Search from './Pages/Search'
import AuthHeader from './Components/AuthHeader'

const AuthenticatedApp = () => {

  return (
  <>
    <AuthHeader />
    <Search />
  </>

  )
}

export default AuthenticatedApp;