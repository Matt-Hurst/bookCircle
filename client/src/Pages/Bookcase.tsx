import React from 'react';
import BookShelf from '../Components/BookShelf';
import { User } from '../Interfaces'
import './Bookcase.scss'

interface myProps {
  user: User;
  name?: string;
}

const Bookcase = (props: myProps) => {
  return (
    <div className="bookCase">
      <h1>{props.name ? `${props.name}'s`  : 'Your'} Library:</h1>
      <BookShelf category={'All Books'} books={props.user.books} />
      <BookShelf category={'Fiction'} books={props.user.books ? props.user.books.filter(book => book.genre?.toLocaleLowerCase() === 'fiction'): null} />
    </div>

  )
}

export default Bookcase;