import React from 'react';
import Search from './Pages/Search'
import AuthHeader from './Components/AuthHeader'

interface myProps {
  user: string;
}

const AuthenticatedApp = (props: myProps) => {

  return (
  <>
    <AuthHeader />
    <Search userName={props.user}/>
  </>

  )
}

export default AuthenticatedApp;