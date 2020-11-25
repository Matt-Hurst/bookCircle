import { User, ActivityLog, Book, AddFriend, BookRequest, NewBook } from '../Interfaces'

const URL = 'http://localhost:3001/'

// function to get things from local storage
function retrieveTokenFromLocalStorage (): string {
  return localStorage.getItem('token') || ''
}

async function login(name: string, password: string): Promise<string> {
  const result = await fetch(URL+'login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, password})
  })
  .then(response => response.json())
  .then(token => {
    console.log('TOKEN',token)
    localStorage.setItem('token', token.token)
    return token
  })
  return result;
}

async function getCurrentUser(): Promise<User> {
  const result = await fetch(URL+'getCurrentUser', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
    }
  })
    .then(response => response.json())
  return result;
}

async function getUser(name: string): Promise<User> {
  const user = await fetch(URL+'getUser/'+name,  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
    }
  })
    .then(response => response.json())
  return user[0];
}

async function getFriendName(name: string): Promise<Object> {
  const friendsName = await fetch(URL+'getFriendsNames/'+name,  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
    }
  })
    .then(response => response.json())
  return friendsName.name;
}

async function searchFriend(name: string): Promise<Object> {
  const friend = await fetch(URL+'searchFriend/'+name,  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
    }
  })
    .then(response => response.json())
  return friend;
}

async function addFriend(obj: AddFriend): Promise<Object> {
  const result = await fetch(URL+'addFriend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
    },
    body: JSON.stringify(activity)
  })
  .then(response => response.json())
  return result;
}

async function rejectFriend(activity: ActivityLog): Promise<Object> {
  const result = await fetch(URL+'rejectFriendRequest', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
    },
    body: JSON.stringify(activity)
  })
  .then(response => response.json())
  return result;
}

async function addBook(newbook: NewBook) {
  const result = await fetch(URL+'addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
      },
      body: JSON.stringify(newbook)
    })
    .then(response => response.json())

    return result
}

async function deleteBook(userId: string, bookId: string) {
  const result = await fetch(URL+'deleteBook', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`

    },
    body: JSON.stringify({userId, bookId})
  }).then(response => response.json())
  return result;
}

async function updateBook(userId: string, bookId: string, newBook: Book) {
  const result = await fetch(URL+'editBook', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`

    },
    body: JSON.stringify({userId, bookId, newBook})
  }).then(response => response.json())
  return result;
}

async function getAvailableBooks(id: string |null) {
  return await fetch(URL+'availableBooks/'+id, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
    }
  })
    .then(response => response.json())
}

async function requestBook(obj: BookRequest) {
  const result = await fetch(URL+'requestBook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${retrieveTokenFromLocalStorage()}`
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
  addBook,
  acceptBookRequest,
  rejectBookRequest,
  deleteMessage,
  searchFriend,
  addFriend,
  getAvailableBooks,
  updateTarget,
  deleteBook,
  updateBook,
  getCurrentUser,
  login
}