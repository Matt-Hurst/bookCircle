import { User, ActivityLog } from '../Interfaces'

const URL = 'http://localhost:3001/'

async function getUser(name: string): Promise<User> {
  const user = await fetch(URL+'getUser/'+name)
    .then(response => response.json())

  return user[0];
}

async function getFriendName(name: string): Promise<Object> {
  const friendsName = await fetch(URL+'getFriendsNames/'+name)
    .then(response => response.json())
  return friendsName.name;
}

async function acceptFriend(activity: ActivityLog): Promise<Object> {
  const result = await fetch(URL+'confirmFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activity)
  })
  .then(response => response.json())

  return result;
 
}

export {
  getUser,
  getFriendName,
  acceptFriend
}