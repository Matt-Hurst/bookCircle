import React from 'react';

import BookDisplay from './Book';

import { Book } from '../Interfaces';

import './BookShelf.scss'

interface myProps {
  books: Array<Book> | null;
}

const BookShelf = (props: myProps) => {
  return (
    <>
    <div className="bookShelf">
      {props.books && props.books.map(book => <BookDisplay key={book._id} book={book} />
      )}
    </div>
    </>
  )
}

export default BookShelf;