import React, { FunctionComponent } from 'react';
import BookDisplay from './Book';
import { Book } from '../Interfaces';
import './BookShelf.scss'

type BookShelfProps = {
  books: Array<Book> | null,
  getSelectedFriend?: Function,
  handleBookClicked: Function
}

const BookShelf: FunctionComponent<BookShelfProps> = ({books, getSelectedFriend, handleBookClicked}) => {
  return (
    <>
    <div className="bookShelf">
      {books && books.map(book => <BookDisplay key={book._id} book={book} handleBookClicked={handleBookClicked} />
      )}
    </div>
    </>
  )
}

export default BookShelf;