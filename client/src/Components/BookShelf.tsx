import React from 'react';

import BookDisplay from './Book';

import { Book } from '../Interfaces';

import './BookShelf.scss'

interface myProps {
  books: Array<Book> | null;
  category: string;
}

const BookShelf = (props: myProps) => {
  return (
    <>
    <h2 className="bookShelfH2">{props.category}</h2>
    <div className="bookShelf">
      {props.books && props.books.map(book => <BookDisplay key={book._id} book={book} />
      )}
    </div>
    </>
  )
}

export default BookShelf;