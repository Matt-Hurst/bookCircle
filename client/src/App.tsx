import React, { useState, useEffect } from 'react';
import UnauthenticatedApp from './UnauthenticatedApp'
import AuthenticatedApp from './AuthenticatedApp'
import { getUser, acceptFriend } from './ApiService/serverApiService'
import { ActivityLog, User } from './Interfaces'
import './App.scss';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<User>()

  async function getUserData (name: string) {
    const user: User = await getUser(name);
    setUserLoggedIn(user);
  }

  // TODO: function that saves all friends books available to borrow to state
  
  useEffect( () => {
    getUserData('Matt')
  }, [])

  // function to confirm friend
  const confirmFriend = async (activity: ActivityLog) => {
    const result: any = await acceptFriend(activity);
    setUserLoggedIn(result)
  }

  return (
    <div>
    { userLoggedIn && <AuthenticatedApp user={userLoggedIn} confirmFriend={confirmFriend} />}
    { !userLoggedIn && <UnauthenticatedApp />}
   </div>
  );
}

export default App;
