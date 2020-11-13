import { User } from '../Interfaces'

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

export {
  getUser,
  getFriendName
}