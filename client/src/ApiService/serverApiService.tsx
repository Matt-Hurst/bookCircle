import { User, ActivityLog, Book, AddFriend, BookRequest } from '../Interfaces'

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

async function searchFriend(name: string): Promise<Object> {
  const friend = await fetch(URL+'searchFriend/'+name)
    .then(response => response.json())
  return friend;
}

async function addFriend(obj: AddFriend): Promise<Object> {
  const result = await fetch(URL+'addFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.json())
  return result;
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

async function rejectFriend(activity: ActivityLog): Promise<Object> {
  const result = await fetch(URL+'rejectFriendRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activity)
  })
  .then(response => response.json())
  return result;
}

async function getAvailableBooks(id: string |null) {
  return await fetch(URL+'availableBooks/'+id)
    .then(response => response.json())
}

async function requestBook(obj: BookRequest): Promise<User> {
  const result = await fetch(URL+'requestBook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.json())
  return result;
}

async function acceptBookRequest(activity: ActivityLog): Promise<Object> {
  const result = await fetch(URL+'acceptBookRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activity)
  })
  .then(response => response.json())
  return result;
}

async function rejectBookRequest(obj: BookRequest): Promise<Object> {
  const result = await fetch(URL+'rejectBookRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response => response.json())
  return result;
}

async function deleteMessage(activity: ActivityLog): Promise<Object> {
  const result = await fetch(URL+'removeActivityLogElement', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activity)
  })
  .then(response => response.json())
  return result;
}

async function updateTarget(id: string, newTarget: number) {
  return await fetch(URL+'updateTarget', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({_id: id, target: newTarget})
  })
  .then(response => response.json())
}

export {
  getUser,
  getFriendName,
  acceptFriend,
  rejectFriend,
  requestBook,
  acceptBookRequest,
  rejectBookRequest,
  deleteMessage,
  searchFriend,
  addFriend,
  getAvailableBooks,
  updateTarget
}