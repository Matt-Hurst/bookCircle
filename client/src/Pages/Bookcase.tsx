import React from 'react';

import BookShelf from '../Components/BookShelf';

import { User } from '../Interfaces'


interface myProps {
  user: User;
}

const Bookcase = (props: myProps) => {
  return (
    <div>
      <h1>Bookcase</h1>
      <BookShelf books={props.user.books} />
    </div>

  )
}

export default Bookcase;