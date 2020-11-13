import { User } from '../Interfaces'

const URL = 'http://localhost:3001/'

async function getUser(name: string): Promise<User> {
  const user = await fetch(URL+'getUser/'+name)
    .then(response => response.json())

  return user[0];
}

export {
  getUser
}