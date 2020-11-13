import React, { useState, useEffect } from 'react';
import UnauthenticatedApp from './UnauthenticatedApp'
import AuthenticatedApp from './AuthenticatedApp'
import { getUser } from './ApiService/serverApiService'
import { User } from './Interfaces'
import './App.scss';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<User>()

  async function getUserData (name: string) {
    const user: User = await getUser(name);
    setUserLoggedIn(user);
  }

  
  useEffect( () => {
    getUserData('Ed')
  }, [])

  return (
    <div>
    { userLoggedIn && <AuthenticatedApp user={userLoggedIn}/>}
    { !userLoggedIn && <UnauthenticatedApp />}
   </div>
  );
}

export default App;
