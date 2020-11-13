import React from 'react';
import { Book } from '../Interfaces';

import './BookShelf.scss'

interface myProps {
  books: Array<Book> | null;
}

const BookShelf = (props: myProps) => {
  return (
    <div className="bookShelf">
      {props.books && props.books.map(book => <div key={book._id}><img src={book.imageUrl} alt={`${book.title} book cover`}/></div>
      )}
    </div>
  )
}

export default BookShelf;